<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';
	import Select from 'svelte-select';

	import { t } from '$lib/i18n';
	import { readFileAsync } from '$utils/helpers';

	let input: HTMLInputElement;
	let imgSrc: string;

	const handleBrowseFile = () => {
		input?.click();
	};

	const handleInputChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
		const file = e.currentTarget.files?.[0];
		if (file) {
			imgSrc = await readFileAsync(file);
		}
	};
</script>

<div class="mt-5">
	<h1>{$t('create_post')}</h1>
	<div class="flex">
		<div class="card card-bordered flex-1 p-5 max-w-[60%] mt-5 space-y-5">
			<input type="text" placeholder="Title" class="input input-bordered w-full" />
			<div class="card bg-gray-700 p-5 space-y-5">
				<div
					class="card card-bordered flex flex-col justify-center items-center p-5 border-2 border-accent border-dashed"
				>
					{#if imgSrc}
						<!-- content here -->
						<img class="rounded" src={imgSrc} alt="" />
					{:else}
						<i class="bi bi-image text-3xl" />
						<p>Drag and drop your files here</p>
						<div class="divider uppercase font-semibold">{$t('or')}</div>
						<button class="btn btn-primary" on:click={handleBrowseFile}>Browse files</button>
					{/if}
				</div>
			</div>
			<div class="svelte-select">
				<Select
					class="h-12 !bg-base-100 !border-base-content !border-opacity-20"
					loadOptions={async () => {
						const resp = await fetch('https://jsonplaceholder.typicode.com/users');
						const users = await resp.json();
						return users.map((u) => ({
							label: u.username,
							value: u.id
						}));
					}}
				>
					<div slot="empty" class="p-3 bg-base-200 border-base-200">Nothing to see here...</div>
				</Select>
			</div>
		</div>
		<div class="" />
	</div>
</div>
<input type="file" class="hidden" bind:this={input} on:change={handleInputChange} />
