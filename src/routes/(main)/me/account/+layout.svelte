<script lang="ts">
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import UserNav from '$lib/components/UserNav.svelte';
</script>

<div
	class="grid grid-cols-4 drop-shadow-xl rounded-container-token bg-surface-50 dark:bg-surface-900 border border-surface-200 dark:border-surface-700"
>
	<div
		class="col-span-4 px-4 md:px-8 pb-4 pt-8 flex items-center bg-surface-100 dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700 rounded-t-md"
	>
		<Breadcrumb />
	</div>
	<div class="col-span-4 sm:col-span-3 px-4 md:px-8 pb-8 pt-4">
		<slot />
	</div>
	<div
		class="col-span-1 bg-surface-50 dark:bg-surface-900 border-0 border-l border border-surface-200 dark:border-surface-700 hidden sm:block rounded-br-md"
	>
		<UserNav />
	</div>
</div>
