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

<div class="flex flex-col justify-center max-w-sm h-full variant-glass-surface p-4 space-y-8">
	<h2 class="h2 font-thin">Create a new account</h2>
	<p class="font-bold">Already have an account? <a href="/login" class="anchor">Sign In</a></p>
	<form
		use:focusTrap={isFocused}
		action="?/register"
		method="POST"
		class="flex flex-col space-y-4"
		use:enhance
	>
		<label class="label">
			<span>Username</span>
			<input
				class="input"
				title="Input (text)"
				type="text"
				placeholder="username"
				name="username"
			/>
			<p class="text-error-400">&nbsp;{usernameError}</p>
		</label>
		<label class="label">
			<span>Email Address</span>
			<input
				class="input"
				title="Input (email)"
				type="email"
				placeholder="example@email.com"
				autocomplete="email"
				name="email"
			/>
			<p class="text-error-400">&nbsp;{emailError}</p>
		</label>
		<label class="label">
			<span>Password</span>
			<input
				class="input"
				title="Input (password)"
				type="password"
				placeholder="password"
				name="password"
			/>
			<p class="text-error-400">&nbsp;{passwordError}</p>
		</label>
		<button class="btn variant-filled-primary" type="submit">Create Account</button>
	</form>
</div>
