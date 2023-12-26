<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	export let listLayout: string = '';

	const paths = [
		{ name: 'Hem', path: '/' },
		{ name: 'Konto', path: '/me/account' },
		{ name: 'Säkerhet', path: '/blog/safety' },
		{ name: 'Parkering', path: '/blog/parking' }
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
</ul>
