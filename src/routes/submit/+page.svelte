<script lang="ts">
	import Dropzone from '$components/dropzone/dropzone.svelte';
	import Select from '$components/select/select.svelte';
	import { t } from '$lib/i18n';
</script>

<div class="mt-5">
	<h1>{$t('create_post')}</h1>
	<div class="flex">
		<div class="card card-bordered flex-1 p-5 max-w-[60%] mt-5 space-y-5">
			<input type="text" placeholder="Title" class="input input-bordered w-full" />
			<Dropzone multiple accept="image/*" />
			<Dropzone accept="image/*" />
			<Select />
		</div>
		<div class="" />
	</div>
</div>
