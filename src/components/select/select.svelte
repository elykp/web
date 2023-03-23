<script lang="ts">
	import Select from 'svelte-select';
	import type { SelectProps } from 'svelte-select/Select.svelte';

	type $$Props = SelectProps;
</script>

<Select
	showChevron
	class="svelte-select h-12 !bg-base-100 !border-base-content !border-opacity-20"
	{...$$restProps}
>
	<div slot="empty" class="p-3 bg-base-200 border-base-200">
		<img class="w-20 h-20 m-auto" src="/empty-box.png" alt="" />
		<p class="text-center text-sm mt-2">Nothing is here</p>
	</div>
	<div slot="chevron-icon">
		<i class="bi bi-chevron-down" />
	</div>
</Select>

<style>
	:global(.svelte-select) {
		--list-background: hsl(var(--b2, var(--b1)) / var(--tw-bg-opacity));
		--item-hover-bg: hsl(var(--b1) / var(--tw-bg-opacity));
		margin: inherit !important;
	}
</style>
