<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	export let listLayout: string = '';

	const paths = [
		{ name: 'Hem', path: '/me/dashboard' },
		{ name: 'Konto', path: '/me/account' },
		{ name: 'Säkerhet', path: '/me/safety' },
		{ name: 'Parkering', path: '/me/parking' }
	];

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<ul class={listLayout}>
	{#each paths as { name, path }}
		{@const active = $page.url.pathname === path ? 'page' : null}
		{@const activeClass =
			$page.url.pathname === path ? '!variant-soft-primary ' : 'hover:!variant-soft-primary'}
		<li>
			<a class="btn btn-sm {activeClass}" aria-current={active} href={path} on:click={drawerClose}
				>{name}</a
			>
		</li>
	{/each}
	<li>
		<a
			href="/faq"
			class="btn btn-sm text-white dark:text-primary-100 bg-gradient-to-br variant-gradient-tertiary-primary dark:from-tertiary-700 dark:to-primary-700"
		>
			Priser &amp; FAQ ✨
		</a>
	</li>
</ul>
