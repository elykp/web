<script>
	import { isAuthenticated$, signIn } from '$lib/data-access/auth';
	import { enqueue } from '$lib/data-access/toast';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if !$isAuthenticated$}
	<button on:click={signIn}>Login</button>
{/if}

<button on:click={() => enqueue('asdo')}>Enqueue</button>
<button on:click={() => enqueue('asdo', { variant: 'info' })}>Enqueue</button>
<button on:click={() => enqueue('asdo', { variant: 'error' })}>Enqueue</button>
<button
	on:click={() =>
		enqueue(
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis, quasi? Placeat quas repellat, veritatis voluptatem enim nulla laboriosam sunt quod.',
			{ variant: 'warning' }
		)}>Enqueue</button
>
