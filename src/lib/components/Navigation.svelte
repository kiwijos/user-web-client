<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	export let navClasses: string = '';
	export let itemClasses: string = '';

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

<nav class={navClasses}>
	{#each paths as { name, path }}
		{@const active = $page.url.pathname === path ? 'page' : null}
		{@const activeClass =
			$page.url.pathname === path ? '!variant-soft-primary ' : 'hover:!variant-soft-primary'}
		<a
			class="btn btn-sm {activeClass} {itemClasses}"
			aria-current={active}
			href={path}
			on:click={drawerClose}>{name}</a
		>
	{/each}
</nav>
