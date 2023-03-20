<script lang="ts">
	import clsx from 'clsx';
	import { getCDNLink } from '$utils/helpers';

	export let src: string | undefined;
	export let username = '';
	export let w = 'w-12';
	export let ring = false;

	const ringCls = 'ring ring-primary ring-offset-base-100 ring-offset-2';
</script>

<div class="avatar" class:placeholder={!src}>
	{#if src}
		<div class={clsx('rounded-full', ring && ringCls, w)}>
			<img src={getCDNLink(src)} alt="" />
		</div>
	{:else if username.trim()}
		<div class={clsx('bg-neutral-focus text-neutral-content rounded-full', ring && ringCls, w)}>
			<span class="text-sm uppercase">{username.charAt(0)}</span>
		</div>
	{:else}
		<div class={clsx('rounded-full', ring && ringCls, w)}>
			<img src="/avatar-placeholder.webp" alt="" />
		</div>
	{/if}
</div>
