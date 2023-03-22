<script>
	import { onMount } from 'svelte';

	// Prioritised import to preload styles
	import '../app.css';

	import { isLoading$ } from '$lib/data-access/auth';
	import { initialize } from '$utils/app-init';

	import ToastProvider from '../components/toast/toast-provider.svelte';
	import Header from '../layouts/main/header.svelte';

	onMount(() => {
		initialize();
	});
</script>

{#if $isLoading$}
	<div>Loading...</div>
{:else}
	<Header />
	<main class="container">
		<slot />
	</main>
{/if}

<ToastProvider />
