<script lang="ts">
	import { enhance } from '$app/forms';
	import Fa from 'svelte-fa';
	import { faSignOutAlt, faXmark } from '@fortawesome/free-solid-svg-icons';
	import { accountLinksWithIcons } from '$lib/utils/links';
</script>

<aside aria-label="Sidebar" class="overflow-auto h-full">
	<div class="divide-y divide-surface-300 dark:divide-surface-700">
		<ul class="font-medium py-2">
			{#each accountLinksWithIcons as link}
				<li>
					<a
						href={link.path}
						class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-surface-800 dark:text-gray-200 dark:hover:text-white"
					>
						<Fa icon={link.icon} />
						<span class="ms-3">{link.name}</span>
					</a>
				</li>
			{/each}
		</ul>
		<form action="/logout" method="POST" class="font-medium" use:enhance>
			<button
				type="submit"
				class="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-surface-800 dark:text-gray-200 dark:hover:text-white"
			>
				<Fa icon={faSignOutAlt} />
				<span class="ms-3">Logga ut</span>
			</button>
		</form>
	</div>
	<div class="mx-2 my-4 p-4 rounded-lg variant-soft-primary w-fit" role="alert">
		<div class="flex items-center mb-3">
			<span class="badge rounded bg-primary-500 text-white">Kom igång!</span>
			<button
				type="button"
				class="ms-auto -mx-1.5 -my-1.5 btn-icon w-8 h-8 variant-soft-primary flex"
				aria-label="Close alert"
			>
				<Fa icon={faXmark} />
				<span class="sr-only">Close</span>
			</button>
		</div>
		<p class="mb-3 text-sm text-blue-800 dark:text-blue-400">
			Ställ in kortuppgifter för att kunna hyra elsparkcyklar i appen.
		</p>
		<a
			class="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
			href="/me/account/payment">Ställ in kortuppgifter</a
		>
	</div>
</aside>
