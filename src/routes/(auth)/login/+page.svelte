<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { focusTrap } from '@skeletonlabs/skeleton';
	import { PUBLIC_GITHUB_ID } from '$env/static/public';
	// import githubLogo from '$lib/assets/icons/github-mark.svg';
	// import githubLogoWhite from '$lib/assets/icons/github-mark-white.svg';
	import GithubMark from '$lib/components/GithubMark.svelte';
	// export let form: ActionData;

	// pick the logo based on the theme
	// let logo = window.document.body.classList.contains('dark-mode') ? githubLogoWhite : githubLogo;

	let isFocused: boolean = true;

	const github_url = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${PUBLIC_GITHUB_ID}`;
</script>

<div
	class="flex flex-col justify-center md:max-w-sm max-w-full h-full bg-surface-100 dark:variant-glass-surface p-4 space-y-8"
>
	<h2 class="h2 font-thin">Logga in på ditt konto</h2>
	<p class="font-bold">
		Har du inget konto? <a href="/register" class="anchor">Skapa ett konto</a>
	</p>
	<div class="flex flex-col space-y-4">
		<a
			class="block card card-hover p-4 border border-surface-700 flex items-center justify-center space-x-2"
			href={github_url}
		>
			<GithubMark />
			<span>Logga in med GitHub</span>
		</a>
	</div>
	<div class="inline-flex items-center justify-between w-full">
		<hr class="w-16" />
		<span class="px-3 text-gray-500 dark:text-gray-400">Eller med mail och lösenord</span>
		<hr class="w-16" />
	</div>
	<form
		use:focusTrap={isFocused}
		action="?/login"
		method="POST"
		use:enhance
		class="flex flex-col space-y-2"
	>
		<label class="label">
			<span>Din mail</span>
			<input
				class="input"
				title="Input (email)"
				type="email"
				placeholder="exempel@email.com"
				name="email"
			/>
			<p>&nbsp;</p>
		</label>
		<label class="label">
			<span>Ditt lösenord</span>
			<input
				class="input"
				title="Input (password)"
				type="password"
				placeholder="lösenord"
				name="password"
			/>
			<p>&nbsp;</p>
		</label>
		<button class="btn bg-primary-500 text-white" type="submit">Logga in</button>
	</form>
</div>
