<script lang="ts">
	import { page } from '$app/stores';
</script>

<h2 class="h2 font-thin text-surface-700 dark:text-surface-300">
	{$page.status}
	{$page.error?.message}
</h2>
