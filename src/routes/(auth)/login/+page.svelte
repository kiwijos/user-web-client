<script lang="ts">
	// import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { focusTrap } from '@skeletonlabs/skeleton';
	import { PUBLIC_GITHUB_ID } from '$env/static/public';
	import Fa from 'svelte-fa';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';

	let isFocused: boolean = true;

	const github_url = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${PUBLIC_GITHUB_ID}`;
</script>

<h2 class="h2 font-thin text-surface-700 dark:text-surface-300">Logga in på ditt konto</h2>
<p class="font-medium text-surface-700 dark:text-surface-300">
	Har du inget konto? <a href="/register" class="anchor">Skapa ett konto</a>
</p>
<div>
	<a
		class="block card card-hover p-4 border border-surface-500 flex items-center justify-center space-x-2 text-surface-700 dark:text-surface-300"
		href={github_url}
	>
		<Fa icon={faGithub} size="lg" />
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
		<span class="text-sm font-bold text-surface-700 dark:text-surface-300">Din mail</span>
		<input
			class="input"
			title="Input (mail)"
			type="email"
			placeholder="exempel@email.com"
			name="email"
		/>
		<p class="text-error-400 text-xs">&nbsp;</p>
	</label>
	<label class="label">
		<span class="text-sm font-bold text-surface-700 dark:text-surface-300">Ditt lösenord</span>
		<input
			class="input"
			title="Input (lösenord)"
			type="password"
			placeholder="lösenord"
			name="password"
		/>
		<p class="text-error-400 text-xs">&nbsp;</p>
	</label>
	<button class="btn bg-primary-500 text-white" type="submit">Logga in</button>
</form>
