<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	export let listLayout: string = '';

	const paths = [{ name: 'Hem', path: '/' }];

	if ($page.data.user !== null) {
		paths.push(
			{ name: 'Profil', path: '/me/account' },
			{ name: 'Betalningar', path: '/me/account/transactions' },
			{ name: 'Resehistorik', path: '/me/account/trips' }
		);
	}

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<ul class={listLayout} data-sveltekit-preload-data="false">
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
</ul>
