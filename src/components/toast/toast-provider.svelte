<script>
	import { toastStore$ } from '$lib/data-access/toast';
	import Toast from './toast.svelte';
</script>

<div class="toast toast-bottom items-end">
	{#each $toastStore$ as item (item.id)}
		<Toast data={item} />
	{/each}
</div>
