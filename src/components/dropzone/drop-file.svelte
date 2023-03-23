<script lang="ts">
	import clsx from 'clsx';
	import { createEventDispatcher } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	import { bToMB } from './helpers';
	import type { IFile } from './interface';

	export let file: IFile;
	export let square = false;

	const dispatch = createEventDispatcher<{ remove: IFile }>();

	const handleRemove = (file: IFile) => {
		dispatch('remove', file);
	};

	$: dataTip = `${file.name}\n${bToMB(file.size).toFixed(1)} MB`;
</script>

<div class="relative grid place-content-center" in:scale={{ easing: quintOut }}>
	<div class="tooltip mx-auto" data-tip={dataTip}>
		{#if file.icon}
			<div class="text-center text-base-content">
				<i class={clsx(file.icon, 'text-3xl md:text-4xl')} />
				<p class="mt-2 truncate">{file.name}</p>
			</div>
		{:else}
			<img
				class="aspect-square object-cover rounded-lg group-hover:blur-[2px] overflow-hidden"
				class:aspect-square={square}
				src={file.previewUrl}
				alt=""
			/>
		{/if}
	</div>
	<svg
		class="bi bi-x-circle-fill stroke-current flex-shrink-0 h-6 w-6 absolute top-1 right-1 cursor-pointer text-white"
		on:click={() => handleRemove(file)}
		on:keypress={() => handleRemove(file)}
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		><path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
		/></svg
	>
</div>
