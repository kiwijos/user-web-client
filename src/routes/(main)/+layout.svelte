<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import UserDropdown from '$lib/components/UserDropdown.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { brand } from '$lib/config';

	const drawerStore = getDrawerStore();

	function drawerOpen(): void {
		drawerStore.open({});
	}
</script>

<!-- The drawer overlays the page when active -->
<Drawer width="w-3/4 md:w-96">
	<Navigation
		navClasses="h-full flex flex-col justify-evenly"
		itemClasses="justify-start grow text-xl p-8"
	/>
</Drawer>

<AppShell
	slotPageFooter="dark:bg-surface-900 bg-surface-100 border-t dark:border-surface-800 border-surface-200 "
>
	<svelte:fragment slot="header">
		<AppBar
			background="dark:bg-surface-800 bg-surface-100"
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotLead="place-content-start"
			slotTrail="place-content-end col-start-2 col-end-4 md:col-start-3 row-start-1 md:row-start-auto"
			padding="py-2 px-4"
			shadow="drop-shadow-sm"
			spacing="space-x-0 space-y-0"
			gap="gap-0"
		>
			<svelte:fragment slot="lead">
				<button
					class="md:hidden md:mr-2 w-8 h-8 rounded-full focus:ring-4 focus:ring-surface-300 dark:focus:ring-surface-600 relative inline-block"
					on:click={drawerOpen}
				>
					<span>
						<svg viewBox="0 0 100 80" class="fill-token w-8 h-4">
							<rect width="100" height="12" />
							<rect y="30" width="75" height="12" />
							<rect y="60" width="100" height="12" />
						</svg>
					</span>
				</button>
				<a
					class="hidden md:flex btn btn-sm font-extrabold text-xl underline decoration-primary-400 dark:decoration-primary-800 decoration-4"
					href="/">{brand}</a
				>
			</svelte:fragment>
			<div class="hidden md:flex items-center space-x-2">
				<Navigation navClasses="flex items-center" />
			</div>
			<svelte:fragment slot="trail">
				{#if !$page.data.user}
					<div class="space-x-2">
						<a class="btn btn-sm variant-ringed" href="/login">Logga in</a>
						<a class="btn btn-sm variant-filled-primary !text-white" href="/register">Skapa konto</a
						>
					</div>
				{:else}
					<UserDropdown />
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>
