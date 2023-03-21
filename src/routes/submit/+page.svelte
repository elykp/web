<script>
	import { t } from '$lib/i18n';
</script>

<div class="mt-5">
	<h1>{$t('create_post')}</h1>
	<div class="flex">
		<div class="card card-bordered flex-1 p-5 max-w-[60%] mt-5">
			<input type="text" placeholder="Title" class="input input-bordered w-full" />
			<div class="card bg-gray-700 p-5 space-y-5">
				<div
					class="card card-bordered aspect-video flex flex-col justify-center items-center p-5 border-2 border-accent border-dashed"
				>
					<i class="bi bi-image text-3xl" />
					<p>Browse file to upload</p>
				</div>
				<button class="btn btn-primary">Upload</button>
			</div>
		</div>
		<div class="" />
	</div>
</div>
