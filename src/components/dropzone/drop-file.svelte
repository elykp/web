<svelte:options immutable />

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
	<div class="ctooltip mx-auto" data-tip={dataTip}>
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
	<div
		class="h-8 w-8 absolute top-2 right-2 grid place-content-center cursor-pointer bg-white shadow rounded-full"
		on:click={() => handleRemove(file)}
		on:keypress={() => handleRemove(file)}
	>
		<i class="bi bi-x text-black text-2xl" />
	</div>
</div>
