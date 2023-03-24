<script lang="ts">
	import Dropzone from '$components/dropzone/dropzone.svelte';
	import type { IFile } from '$components/dropzone/interface';
	import Select from '$components/select/select.svelte';
	import { t } from '$lib/i18n';

	let selectedTags: any[] = [];
	let uploadedFiles: IFile[] = [];
	let title: string;

	const loadSuggestedTags = async (filterText: string) => {
		if (filterText.length === 0) return [];
		return [
			{ value: 1, label: 'ok' },
			{ value: 2, label: 'okla' },
			{ value: 3, label: 'oklalka' }
		];
	};

	const handleSelectTag = (tag) => {
		selectedTags = [...selectedTags, tag];
	};

	const handleSubmit = () => {
		console.log({
			title,
			file: uploadedFiles[0],
			tags: selectedTags
		});
	};
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
				multiple
				placeholder={$t('add_at_least_1_tag')}
				loadOptions={loadSuggestedTags}
				debounceWait={300}
				on:select={(e) => handleSelectTag(e.detail)}
			/>
			<p><strong>{$t('add_tags_to_categorize_posts')}</strong></p>
			<div class="flex">
				<div class="flex-grow" />
				<button class="btn btn-primary" on:click={handleSubmit}>{$t('post')}</button>
			</div>
		</div>
		<div class="" />
	</div>
</div>
