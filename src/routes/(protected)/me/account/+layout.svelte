<script lang="ts">
	import { page } from '$app/stores';

	// map route names in english to their localized counterparts (swedish in this case, but could be any language)
	const names: { [key: string]: string } = {
		account: 'Konto',
		transactions: 'Transaktioner',
		payment: 'Kortuppgifter',
		settings: 'Inställningar',
		trips: 'Resehistorik'
	};

	// create breadcrumbs for all pages after /me
	$: myBreadcrumbs = $page.url.pathname
		.split('/')
		.slice(2)
		.map((crumb, i) => {
			return {
				label: names[crumb] || crumb,
				link: $page.url.pathname
					.split('/')
					.slice(0, i + 3)
					.join('/')
			};
		});
</script>

<div class="card divide-y divide-surface-200 dark:divide-surface-700 h-2xl">
	<header class="card-header px-4 lg:px-8 py-2 flex items-center">
		<ol class="breadcrumb">
			{#each myBreadcrumbs as crumb, i}
				{#if i < myBreadcrumbs.length - 1}
					<li class="crumb"><a class="anchor" href={crumb.link}>{crumb.label}</a></li>
					<li class="crumb-separator" aria-hidden>&rsaquo;</li>
				{:else}
					<li class="crumb">{crumb.label}</li>
				{/if}
			{/each}
		</ol>
	</header>
	<section class="p-4 lg:p-8"><slot /></section>
</div>
