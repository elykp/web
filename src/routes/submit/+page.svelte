<script lang="ts">
	import {
		debounceTime,
		distinctUntilChanged,
		firstValueFrom,
		from,
		mergeMap,
		Subject,
		takeUntil,
		tap
	} from 'rxjs';
	import { onDestroy, onMount } from 'svelte';

	import Dropzone from '$components/dropzone/dropzone.svelte';
	import type { IFile } from '$components/dropzone/interface';
	import Select from '$components/select/select.svelte';
	import { enqueue } from '$lib/data-access/toast';
	import { photosApi, tagsApi } from '$lib/http/api';
	import { getTrendingTags, type Tag } from '$lib/http/api/tags';
	import { t } from '$lib/i18n';
	import { writable } from '$lib/store';
	import { encodeImageToBlurhash } from '$utils/blurhash';

	type STag = Tag & { new?: boolean };

	let selectedTags: STag[] = [];
	let uploadedFiles: IFile[] = [];
	let title: string;
	let createPhotoLoading = false;
	let filterText$ = writable('');
	let stop$ = new Subject<void>();
	let items: STag[];

	const trendingTags$ = getTrendingTags();

	const loadSuggestedTags = async (filterText: string) => {
		if (filterText.length === 0) return [];
		return await firstValueFrom(tagsApi.getRelatedTagByQuery(filterText));
	};

	const handleSelectTag = (tag: STag) => {
		if (selectedTags.length < 3 || !selectedTags.some((it) => it.id === tag.id)) {
			selectedTags = [...selectedTags, tag];
		}
	};

	const handleRemoveTag = (payload: STag | STag[]) => {
		if (Array.isArray(payload)) {
			selectedTags = selectedTags.filter((it) => payload.findIndex((p) => p.id === it.id) === -1);
		} else {
			selectedTags = selectedTags.filter((it) => it.id !== payload.id);
		}
	};

	const handleSubmit = () => {
		const file = uploadedFiles[0];
		if (!file) {
			enqueue('Cannot create a post without an image', { variant: 'error' });
			return;
		}

		createPhotoLoading = true;
		from(encodeImageToBlurhash(file.previewUrl!))
			.pipe(
				mergeMap((blurhash) =>
					photosApi.createPhoto({
						title,
						tags: selectedTags.map((it) => it.name),
						nsfw: false,
						blurhash
					})
				)
			)
			.pipe(
				tap(() => {
					createPhotoLoading = false;
					title = '';
					uploadedFiles = [];
					selectedTags = [];
					file.previewUrl && URL.revokeObjectURL(file.previewUrl);
					items = [];
					enqueue('Create post success', { variant: 'success' });
				})
			)
			.subscribe();
	};

	const handleFilter = (e: CustomEvent) => {
		const filteredTags = e.detail as STag[];
		const name = filterText$.getValue();
		if (!filteredTags?.length && name) {
			items = [{ id: Date.now(), name, highlighted: name, new: true }];
		}
	};

	onMount(() => {
		filterText$
			.pipe(distinctUntilChanged(), debounceTime(300), tap(console.log), takeUntil(stop$))
			.subscribe();
	});

	onDestroy(() => {
		stop$.next();
		stop$.complete();
	});

	$: postDisable = !uploadedFiles.length || !title || !selectedTags.length;
</script>

<div class="mt-5">
	<h1>{$t('create_post')}</h1>
	<div class="flex">
		<div class="card card-bordered flex-1 p-5 max-w-[60%] mt-5 space-y-5">
			<input
				type="text"
				placeholder={$t('title')}
				class="input input-bordered w-full"
				bind:value={title}
			/>
			<Dropzone bind:files={uploadedFiles} accept="image/*" />
			<Select
				itemId="id"
				label="name"
				multiple
				value={selectedTags}
				placeholder={$t('add_at_least_1_tag')}
				loadOptions={loadSuggestedTags}
				debounceWait={300}
				bind:items
				bind:filterText={$filterText$}
				on:filter={handleFilter}
				on:select={(e) => handleSelectTag(e.detail)}
				on:clear={(e) => handleRemoveTag(e.detail)}
			>
				<div class="flex" slot="item" let:item>
					{#if item.highlighted}
						<span>{@html item.highlighted}</span>
					{/if}
					<div class="flex-grow" />
					{#if item.count != undefined}
						<span>{item.count}</span>
					{/if}
				</div>
			</Select>
			<p><strong>{$t('add_tags_to_categorize_posts')}</strong></p>
			<div class="flex flex-wrap gap-3">
				{#if $trendingTags$}
					{@const tags = $trendingTags$.filter(
						(it) => selectedTags.findIndex((t) => t.id === it.id) === -1
					)}
					{#each tags as item (item.id)}
						<div class="badge badge-lg flex items-center gap-2">
							{item.name}
							<i
								class="bi bi-plus text-xl cursor-pointer"
								on:click={() => {
									handleSelectTag(item);
								}}
								on:keypress={() => {}}
							/>
						</div>
					{/each}
				{/if}
			</div>
			<div class="flex">
				<div class="flex-grow" />
				<button
					class="btn btn-primary"
					class:loading={createPhotoLoading}
					disabled={postDisable}
					on:click={handleSubmit}
					>{$t('post')}
				</button>
			</div>
		</div>
		<div class="" />
	</div>
</div>
