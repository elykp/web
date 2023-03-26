<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	// Prioritised import to preload styles
	import '../app.css';

	import { globalLoading$ } from '$lib/data-access/global';
	import { initialize } from '$utils/app-init';

	import ToastProvider from '../components/toast/toast-provider.svelte';
	import Header from '../layouts/main/header.svelte';

	let unsubcribes: any[] = [];

	onMount(() => {
		unsubcribes = initialize();
	});

	onDestroy(() => {
		unsubcribes.forEach((unsubcribe) => {
			unsubcribe();
		});
	});
</script>

{#if $globalLoading$}
	<div>Loading...</div>
{:else}
	<Header />
	<main class="container">
		<slot />
	</main>
{/if}

<ToastProvider />
