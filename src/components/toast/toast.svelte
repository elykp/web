<script lang="ts">
	import clsx from 'clsx';
	import { onDestroy, onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	import { TOAST_DURATION } from '$constants/toast';
	import { dequeue, type Toast } from '$lib/data-access/toast';

	export let data: Toast;

	let timeout: NodeJS.Timeout | undefined;

	function handleDequeue() {
		dequeue(data.id);
	}

	onMount(() => {
		timeout = setTimeout(() => {
			dequeue(data.id);
		}, TOAST_DURATION);
	});

	onDestroy(() => {
		timeout && clearTimeout(timeout);
	});
</script>

<div
	out:fly={{ x: 100, opacity: 0, duration: 300 }}
	class={clsx('w-fit max-w-[400px] min-w-[200px] alert', data.variant)}
>
	<span>{data.message}</span>
	<div class="flex-grow" />
	<i on:click={handleDequeue} on:keypress={handleDequeue} class="bi bi-x-circle cursor-pointer" />
</div>

<style lang="postcss">
	.success {
		@apply alert-success;
	}

	.error {
		@apply alert-error;
	}

	.warning {
		@apply alert-warning;
	}

	.info {
		@apply alert-info;
	}
</style>
