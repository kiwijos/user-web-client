<script lang="ts">
	import { icon } from '$lib/config';
</script>

<div
	class="h-full w-full bg-gradient-to-br text-white dark:text-primary-100 from-primary-500 via-tertiary-300 to-secondary-400 dark:from-tertiary-800 dark:via-tertiary-900 dark:to-primary-800"
>
	<a
		href="/"
		class="fixed top-4 right-4 btn btn-icon bg-primary-500 dark:bg-primary-800 font-extrabold text-2xl text-white dark:text-gray-300"
	>
		{icon}
	</a>
	<div
		class="flex flex-col justify-start md:max-w-sm max-w-full h-full bg-surface-100 dark:bg-surface-800 px-4 py-4 md:py-8 space-y-8 md:rounded-r-3xl md:shadow-lg"
	>
		<slot />
	</div>
</div>
