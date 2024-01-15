<script lang="ts">
	import { enhance } from '$app/forms';
	import Fa from 'svelte-fa';
	import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
	import { accountLinksWithIcons } from '$lib/utils/links';

	export let asideClasses: string = '';
	export let itemWidth: string = 'w-full';
	export let itemPadding: string = 'px-4 py-3';
	export let itemLayout: string = 'flex items-center';
	export let itemClasses: string = '';
	export let itemText: string = 'text-sm text-gray-700 dark:text-gray-200';
	export let itemHover: string =
		'hover:bg-gray-200 dark:hover:bg-surface-800 dark:hover:text-white';
	export let textStyle: string = 'font-medium';
	export let divide: string = 'divide-y divide-surface-300 dark:divide-surface-700';
	export let container: string = '';
	export let lastItem: string = '';
	export let firstItem: string = '';
</script>

<aside aria-label="Sidebar" class="overflow-auto h-full {asideClasses}">
	<div class="{divide} {container}">
		<ul class={textStyle}>
			{#each accountLinksWithIcons as link, index}
				<li>
					<a
						href={link.path}
						class="{index === 0
							? firstItem
							: ''} {itemClasses} {itemLayout} {itemPadding} {itemWidth} {itemText} {itemHover}"
					>
						<Fa icon={link.icon} />
						<span class="ms-3">{link.name}</span>
					</a>
				</li>
			{/each}
		</ul>
		<form action="/logout" method="POST" class={textStyle} use:enhance>
			<button
				type="submit"
				class="{lastItem} {itemClasses} {itemLayout} {itemPadding} {itemWidth} {itemText} {itemHover}"
			>
				<Fa icon={faSignOutAlt} />
				<span class="ms-3">Logga ut</span>
			</button>
		</form>
	</div>
</aside>
