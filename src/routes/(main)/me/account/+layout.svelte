<script lang="ts">
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import UserNav from '$lib/components/UserNav.svelte';
</script>

<div
	class="flex drop-shadow-xl rounded-container-token bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700"
>
	<div class="grow">
		<div class="px-4 md:px-8 pb-4 pt-8 flex items-center">
			<Breadcrumb />
		</div>
		<div class="px-4 md:px-8 pb-8 pt-4">
			<slot />
		</div>
	</div>
	<div
		class="py-8 shrink-0 bg-surface-100 dark:bg-surface-900 border-0 border-l border border-surface-200 dark:border-surface-700 hidden md:block w-56 rounded-r-md"
	>
		<UserNav />
	</div>
</div>
