<script lang="ts">
	import { github, icon, owner } from '$lib/config';
	import Fa from 'svelte-fa';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';

	const paths = [
		{
			title: 'Åkare',
			subpaths: [
				{ name: 'Kom igång', path: '/blog/start' },
				{ name: 'Mobilappen', path: '/blog/app' },
				{ name: 'FAQ', path: '/blog/faq' },
				{ name: 'Priser', path: '/blog/prices' }
			]
		},

		{
			title: 'teamet',
			subpaths: [
				{ name: 'Om oss', path: '/blog/about' },
				{ name: 'Kontakt', path: '/blog/contact' },
				{ name: 'Jobba hos oss', path: '/blog/work' }
			]
		},
		{
			title: 'resurser',
			subpaths: [
				{ name: 'Parkering', path: '/blog/parking' },
				{ name: 'Säkerhet', path: '/blog/safety' },
				{ name: 'Integritetspolicy', path: '/blog/privacy-policy' },
				{ name: 'Användarvillkor', path: '/blog/terms-and-conditions' }
			]
		},

		{
			title: 'utvecklare',
			subpaths: [
				{ name: 'Dokumentation', path: '/blog/docs' },
				{ name: 'Källkod', path: '/blog/code' }
			]
		}
	];
</script>

<div class="divide-y divide-surface-200 bg-surface-100 dark:bg-surface-900 dark:divide-gray-600">
	<nav class="mx-auto max-w-4xl py-20 px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
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
		<ul
			class="mx-auto max-w-4xl p-4 md:p-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
		>
			<li>
				<a
					href="/me/dashboard"
					class="btn btn-icon bg-primary-500 dark:bg-primary-800 font-extrabold text-2xl text-white dark:text-gray-300"
				>
					{icon}
				</a>
			</li>
			<li>
				<a
					href={github}
					class="flex space-x-2 items-center font-md text-sm block truncate text-gray-500 dark:text-gray-400 anchor"
					><Fa icon={faGithub} /><span>Du hittar sidans källkod på GitHub</span></a
				>
			</li>
			<li>
				<span class="font-md text-sm block truncate text-gray-500 dark:text-gray-400">
					Sidan är designad av {owner} &copy 2023</span
				>
			</li>
		</ul>
	</div>
</div>
