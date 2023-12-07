<script lang="ts">
	import { page } from '$app/stores';
</script>

{#if $page.data.user.has_setup_payment === false}
	<a
		href="/me/account/payment"
		class="block card card-hover p-4 space-y-4 text-white dark:text-primary-100 bg-gradient-to-br variant-gradient-tertiary-primary dark:from-tertiary-800 dark:to-primary-800"
	>
		<h2 class="h2 font-bold">Lås upp ditt första åk! 💫</h2>
		<p>
			För att hyra din första cykel behöver du ange ett betalsätt. Det gör du enkelt genom att
			klicka på denna ruta. Oförglömliga åk väntar!
		</p>
	</a>
{:else}
	(TODO: Add dashboard content)
{/if}
