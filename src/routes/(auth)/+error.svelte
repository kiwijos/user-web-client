<script lang="ts">
	import { page } from '$app/stores';
</script>

<h2 class="h2 font-thin text-surface-700 dark:text-surface-300">
	{$page.error?.message}
</h2>
<p class="font-medium text-surface-700 dark:text-surface-300">
	Har du ett konto? Försök igen. <a href="/login" class="anchor">Logga in</a>
</p>

<p class="font-medium text-surface-700 dark:text-surface-300">
	Eller har du bara hamnat fel? <a href="/" class="anchor">Startsidan</a>
</p>
