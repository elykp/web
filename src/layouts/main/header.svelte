<script lang="ts">
	import { logout, signIn, _user$ } from '$lib/data-access/auth';
	import { t } from '$lib/i18n';

	import Avatar from '../../components/avatar/avatar.svelte';
	import Dropdown from '../../components/dropdown/dropdown.svelte';
</script>

<nav class="h-[64px] bg-gray-800">
	<div class="h-full flex items-center mx-auto container gap-5">
		<a class="capitalize font-bold text-2xl dark:text-white" href="/">ELYKP</a>
		<div class="flex-grow" />
		{#if $_user$}
			<Dropdown>
				<div
					slot="overlay"
					class="w-[250px] menu menu-compact dark:bg-gray-700 rounded-lg shadow-lg"
				>
					<div class="px-4 pt-2 pb-1">
						<p class="font-medium truncate">
							{$_user$.profile.name}
						</p>
						<a
							href={`/${$_user$.profile.preferred_username}`}
							class="block link text-sm font-medium truncate"
							>{$_user$.profile.preferred_username}
						</a>
					</div>
					<div class="divider my-0" />
					<li><a>Item 1</a></li>
					<li><a>Item 2</a></li>
					<li><a>Item 3</a></li>
					<div class="divider my-0" />
					<div class="px-2 pt-1 pb-2">
						<button class="btn btn-block btn-sm btn-outline" on:click={logout}>
							{$t('log_out')}
						</button>
					</div>
				</div>
				<Avatar src={$_user$.profile.picture} w="w-10" />
			</Dropdown>
			<a href="/submit">
				<button class="btn btn-sm btn-primary gap-2">
					<i class="bi bi-pencil" />
					{$t('post')}
				</button>
			</a>
		{:else}
			<button class="btn btn-primary btn-sm" on:click={signIn}>{$t('login')}</button>
		{/if}
	</div>
</nav>
