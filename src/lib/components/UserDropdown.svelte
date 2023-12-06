<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { popup, Avatar } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	};

	const accountLinks = [
		{ name: 'Settings', path: '/me/account/settings' },
		{
			name: 'Payment',
			path: '/me/account/settings/payment'
		},
		{ name: 'Transactions', path: '/me/account/transactions' },
		{ name: 'Trips', path: '/me/account/trips' }
	];
</script>

<button
	type="button"
	class="md:me-0 rounded-full focus:ring-4 focus:ring-surface-300 dark:focus:ring-surface-600 relative inline-block"
	use:popup={popupClick}
>
	{#if $page.data.user.has_setup_payment === false}
		<span
			class="badge-icon variant-filled-warning absolute -top-1 -right-1 z-10 text-white text-xs font-bold w-4 h-4"
			>!</span
		>
	{/if}
	<Avatar width="w-8" src={$page.data.user.avatar} initials={$page.data.user.name[0]} />
</button>
<div data-popup="popupClick">
	<div
		class="my-2 mx-2 text-base list-none bg-surface-100 divide-y divide-surface-200 rounded-lg drop-shadow-sm dark:bg-surface-700 dark:divide-gray-600"
	>
		<div class="px-4 py-3">
			<span class="block text-sm text-gray-900 dark:text-white">{$page.data.user.name}</span>
			<span class="block text-sm text-gray-500 truncate dark:text-gray-400"
				>{$page.data.user.email}</span
			>
		</div>
		<ul class="py-2">
			{#each accountLinks as link}
				<li>
					<a
						href={link.path}
						class="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
						>{link.name}</a
					>
				</li>
			{/each}
		</ul>
		<form action="/logout" method="POST" use:enhance>
			<button
				type="submit"
				class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
			>
				Logout
			</button>
		</form>
	</div>
</div>
