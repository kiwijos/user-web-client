<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { focusTrap } from '@skeletonlabs/skeleton';
	import { PUBLIC_GITHUB_ID } from '$env/static/public';

	export let form: ActionData;

	let isFocused: boolean = true;

	const github_url = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${PUBLIC_GITHUB_ID}`;
</script>

<div
	class="flex flex-col justify-center md:max-w-sm max-w-full h-full dark:variant-glass-surface p-4 space-y-8"
>
	<h2 class="h2 font-thin">Log in to your account</h2>
	<p class="font-bold">
		Don't have an account? <a href="/register" class="anchor">Create an account</a>
	</p>
	<div class="flex flex-col space-y-4">
		<a
			class="block card card-hover p-4 dark:variant-ghost-surface flex items-center justify-center space-x-2"
			href={github_url}
		>
			<span>GitHub</span>
		</a>
	</div>
	<div class="inline-flex items-center justify-between w-full">
		<hr class="w-12" />
		<span class="px-3 text-gray-500 dark:text-gray-400">Or with email and password</span>
		<hr class="w-12" />
	</div>
	<form
		use:focusTrap={isFocused}
		action="?/login"
		method="POST"
		use:enhance
		class="flex flex-col space-y-4"
	>
		<label class="label">
			<span>Your email</span>
			<input
				class="input"
				title="Input (email)"
				type="email"
				placeholder="example@email.com"
				name="email"
			/>
			<p>&nbsp;</p>
		</label>
		<label class="label">
			<span>Your password</span>
			<input
				class="input"
				title="Input (password)"
				type="password"
				placeholder="password"
				name="password"
			/>
			<p>&nbsp;</p>
		</label>
		<button class="btn bg-primary-500" type="submit">Login</button>
	</form>
</div>
