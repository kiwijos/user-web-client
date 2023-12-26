<script lang="ts">
	import { enhance } from '$app/forms';
	import Fa from 'svelte-fa';
	import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
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
</aside>
