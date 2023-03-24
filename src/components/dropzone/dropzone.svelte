<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { ChangeEventHandler, DragEventHandler } from 'svelte/elements';

	import { enqueue } from '$lib/data-access/toast';
	import { t } from '$lib/i18n';

	import DropFile from './drop-file.svelte';
	import { getIconByFileType, validateFileList } from './helpers';
	import type { IFile } from './interface';

	export let accept: string | undefined | null = undefined;
	export let multiple = false;
	export let limitMb = 5;
	export let files: IFile[] = [];

	let input: HTMLInputElement;
	let isDragging = false;

	const handleBrowseFile = () => {
		input?.click();
	};

	const handleInputChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
		processFileList(e.currentTarget.files);
	};

	const handleDrag: DragEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault();
		if (e.type === 'dragenter') {
			isDragging = true;
		} else if (e.type === 'dragleave') {
			isDragging = false;
		}
	};

	const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
		isDragging = false;
		processFileList(e.dataTransfer?.files);
	};

	const processFileList = (fileList?: FileList | null) => {
		if (fileList) {
			try {
				validateFileList(fileList, limitMb, accept);
				if (multiple) {
					const newFiles: IFile[] = [];
					for (const file of fileList) {
						newFiles.push(constructIFile(file));
					}
					files = [...files, ...newFiles];
				} else {
					files = [constructIFile(fileList[0])];
				}
			} catch (e: any) {
				enqueue(e?.message, { variant: 'error' });
			}
		}
	};

	const constructIFile = (file: File) => {
		const constructedIFile = new File([file], file.name, {
			type: file.type
		}) as IFile;
		constructedIFile.id = Math.ceil(Math.random() * 10000).toString();
		const fileIcon = getIconByFileType(file.type);
		constructedIFile.icon = fileIcon;
		if (!fileIcon) {
			constructedIFile.previewUrl = URL.createObjectURL(file);
		}

		return constructedIFile;
	};

	const revokeFileObjectURL = (file: IFile) => {
		if (file.previewUrl) {
			URL.revokeObjectURL(file.previewUrl);
		}
	};

	const onFinish = () => {
		files.forEach(revokeFileObjectURL);
	};

	const handleRemove = (file: IFile) => {
		files = files.filter((it) => it.id !== file.id);
		revokeFileObjectURL(file);
	};

	const resetFileInput = (e: any) => {
		e.currentTarget.value = null;
	};

	onDestroy(() => {
		onFinish();
	});
</script>

<div class="card bg-gray-700 p-5 space-y-5">
	<div
		class="card card-bordered p-5 border-2 border-accent border-dashed"
		class:scale-[1.05]={isDragging}
		on:dragenter={handleDrag}
		on:dragleave={handleDrag}
		on:dragover|preventDefault={() => {}}
		on:drop|preventDefault={handleDrop}
	>
		{#if files.length && !multiple}
			<DropFile file={files[0]} on:remove={(e) => handleRemove(e.detail)} />
		{:else}
			<div class="flex flex-col justify-center items-center" class:pointer-events-none={isDragging}>
				{#if isDragging}
					<i class="bi bi-cloud-upload text-3xl animate-bounce" />
				{:else}
					<i class="bi bi-image text-3xl" />
				{/if}
				<p>{$t('drag_and_drop_your_files_here')}</p>
				<div class="divider uppercase font-semibold">{$t('or')}</div>
				<button
					class="btn btn-primary"
					class:pointer-events-none={isDragging}
					on:click={handleBrowseFile}>{$t('browse_files')}</button
				>
			</div>
		{/if}
	</div>
	{#if files.length && multiple}
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
			{#each files as file (file.id)}
				<DropFile square {file} on:remove={(e) => handleRemove(e.detail)} />
			{/each}
		</div>
	{/if}
</div>
<input
	{multiple}
	{accept}
	type="file"
	class="hidden"
	bind:this={input}
	on:change={handleInputChange}
	on:click={resetFileInput}
/>
