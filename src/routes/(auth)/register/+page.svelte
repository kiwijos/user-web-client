<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { focusTrap } from '@skeletonlabs/skeleton';

	export let form: ActionData;

	let isFocused: boolean = true;

	let usernameError: string = '';
	let emailError: string = '';
	let passwordError: string = '';

	$: if (form?.errors) {
		usernameError =
			form.errors.find((error: { field: string; message: string }) => error.field === 'username')
				?.message ?? '';
		emailError =
			form.errors.find((error: { field: string; message: string }) => error.field === 'email')
				?.message ?? '';
		passwordError =
			form.errors.find((error: { field: string; message: string }) => error.field === 'password')
				?.message ?? '';
	}
</script>

<h2 class="h2 font-thin text-surface-700 dark:text-surface-300">Skapa ett nytt konto</h2>
<p class="font-medium text-surface-700 dark:text-surface-300">
	Har du redan ett konto? <a href="/login" class="anchor">Logga in här</a>
</p>
<form
	use:focusTrap={isFocused}
	action="?/register"
	method="POST"
	class="flex flex-col space-y-2"
	use:enhance
>
	<label class="label">
		<span class="text-sm font-bold text-surface-700 dark:text-surface-300"
			>Vad ska vi kalla dig?</span
		>
		<input
			class="input"
			title="Input (användarnamn)"
			type="text"
			placeholder="användarnamn"
			name="username"
		/>
		<p class="text-error-400 text-xs">&nbsp;{usernameError}</p>
	</label>
	<label class="label">
		<span class="text-sm font-bold text-surface-700 dark:text-surface-300">Din mail</span>
		<input
			class="input"
			title="Input (mail)"
			type="email"
			placeholder="exempel@email.com"
			autocomplete="email"
			name="email"
		/>
		<p class="text-error-400 text-xs">&nbsp;{emailError}</p>
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
		<p class="text-error-400 text-xs">&nbsp;{passwordError}</p>
	</label>
	<button
		class="btn bg-primary-500 text-white"
		aria-describedby="helper-text-explanation"
		type="submit">Skapa konto</button
	>
	<p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
		Vi delar inte din data. Läs vår <a href="/blog/privacy-policy" class="font-medium anchor"
			>Integritetspolicy</a
		>.
	</p>
</form>
