<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { popup, Avatar } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { accountLinks } from '$lib/utils/links';

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	};
</script>

<button
	type="button"
	class="md:me-0 rounded-full focus:ring-4 focus:ring-surface-300 dark:focus:ring-surface-600 relative inline-block"
	use:popup={popupClick}
>
	<Avatar
		width="w-8"
		background="bg-gray-200 dark:bg-surface-600"
		initials={$page.data.user.email[0]}
	/>
</button>
<div data-popup="popupClick">
	<div
		class="min-w-52 my-2 mx-2 text-base list-none bg-surface-100 divide-y divide-surface-200 rounded-lg drop-shadow-sm dark:bg-surface-700 dark:divide-surface-600"
	>
		<a
			href="/me/account"
			class="block rounded-t-lg px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
		>
			<span class="block text-sm text-gray-900 dark:text-white capitalize"
				>{$page.data.user.email.split('@')[0]}</span
			>
			<span class="block text-sm text-gray-500 truncate dark:text-gray-400"
				>{$page.data.user.email}</span
			>
		</a>
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
				class="block w-full rounded-b-lg px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
			>
				Logga ut
			</button>
		</form>
	</div>
</div>
