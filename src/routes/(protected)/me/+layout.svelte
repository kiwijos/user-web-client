<script lang="ts">
	import { Drawer, getDrawerStore, LightSwitch } from '@skeletonlabs/skeleton';
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
	<Navigation listLayout="p-4" />
</Drawer>

<AppShell
	slotPageFooter="dark:bg-surface-900 bg-surface-100 border-t dark:border-surface-800 border-surface-200 "
>
	<svelte:fragment slot="header">
		<AppBar
			background="dark:bg-surface-800 bg-surface-100"
			slotDefault="place-self-start"
			slotLead="place-content-start"
			slotTrail="place-content-end"
			padding="p-2 px-4"
			shadow="drop-shadow-lg"
		>
			<svelte:fragment slot="lead">
				<button
					class="md:hidden mr-2 w-8 h-8 rounded-full focus:ring-4 focus:ring-surface-300 dark:focus:ring-surface-600 relative inline-block"
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
					class="btn btn-sm font-extrabold text-xl underline decoration-primary-400 dark:decoration-primary-800 decoration-4"
					href="/me/dashboard">{brand}</a
				>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="hidden md:flex items-center space-x-2">
					<Navigation listLayout="flex items-center" />
					<LightSwitch />
				</div>
				{#if !$page.data.user}
					<div class="space-x-2">
						<a class="btn btn-sm" href="/login">Sign In</a>
						<a
							class="btn btn-sm text-white bg-gradient-to-br variant-gradient-secondary-primary"
							href="/register">Create Account</a
						>
					</div>
				{:else}
					<UserDropdown />
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="mx-auto max-w-4xl p-4 md:p-8">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>
