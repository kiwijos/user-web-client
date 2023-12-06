<script lang="ts">
	import { page } from '$app/stores';
	import GithubMark from './GithubMark.svelte';

	const paths = [
		{
			title: 'Åkare',
			subpaths: [
				{ name: 'Kom igång', path: '#' },
				{ name: 'Mobilappen', path: '#' },
				{ name: 'FAQ', path: '#' },
				{ name: 'Priser', path: '#' }
			]
		},

		{
			title: 'teamet',
			subpaths: [
				{ name: 'Om oss', path: '#' },
				{ name: 'Kontakt', path: '#' },
				{ name: 'Jobba hos oss', path: '#' }
			]
		},
		{
			title: 'resurser',
			subpaths: [
				{ name: 'Parkering', path: '#' },
				{ name: 'Säkerhet', path: '#' },
				{ name: 'Integritetspolicy', path: '#' },
				{ name: 'Användarvillkor', path: '#' }
			]
		},

		{
			title: 'utvecklare',
			subpaths: [
				{ name: 'Dokumentation', path: '#' },
				{ name: 'Källkod', path: '#' }
			]
		}
	];
</script>

<div class="divide-y divide-surface-200 bg-surface-100 dark:bg-surface-900 dark:divide-gray-600">
	<nav class="mx-auto max-w-4xl p-4 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
		{#each paths as { title, subpaths }}
			<ul class="list-none flex flex-col col-span-1">
				<li class="py-2">
					<span class="h3 font-bold uppercase dark:text-gray-200">{title}</span>
				</li>
				{#each subpaths as { name, path }}
					<li>
						<a
							class="block py-1 text-md text-gray-700 dark:text-gray-300 dark:hover:text-white"
							href={path}>{name}</a
						>
					</li>
				{/each}
			</ul>
		{/each}
	</nav>
	<div>
		<ul class="mx-auto max-w-4xl p-4 md:p-8 flex justify-between items-end">
			<li>
				<a
					href="#"
					class="flex space-x-2 items-center font-md text-sm block truncate text-gray-500 dark:text-gray-400"
					><GithubMark width="w-4" /><span>Du hittar sidans källkod på GitHub</span></a
				>
			</li>
			<li>
				<span class="font-md text-sm block truncate text-gray-500 dark:text-gray-400">
					Sidan är designad av Skoi i Sverige</span
				>
			</li>
		</ul>
	</div>
</div>
