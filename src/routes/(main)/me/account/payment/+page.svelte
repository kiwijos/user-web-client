<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import Fa from 'svelte-fa';
	import { faCcMastercard, faCcVisa, faCcAmex } from '@fortawesome/free-brands-svg-icons';

	export let form: ActionData;

	const cardOptions = [
		{ name: 'Mastercard', value: '1', checked: true, icon: faCcMastercard, color: '' },
		{ name: 'Visa', value: '2', checked: false, icon: faCcVisa, color: '#1434CB' },
		{ name: 'American Express', value: '3', checked: false, icon: faCcAmex, color: '#016FD0' }
	];

	const countryOptions = [{ name: 'Sverige', value: '1' }];

	let cardTypeError: string = '';
	let cardNumberError: string = '';

	$: if (form?.errors) {
		cardTypeError =
			form.errors.find((error: { field: string; message: string }) => error.field === 'cardType')
				?.message ?? '';
		cardNumberError =
			form.errors.find((error: { field: string; message: string }) => error.field === 'cardNumber')
				?.message ?? '';
	}
</script>

<form
	action="?/updatePaymentMethod"
	method="POST"
	use:enhance
	class="flex flex-col space-y-4 max-w-xl"
>
	<div class="space-y-2">
		{#each cardOptions as card}
			<label class="flex items-center space-x-2">
				<input
					class="radio"
					type="radio"
					checked={card.checked}
					name="cardType"
					value={card.value}
				/>
				<span class="text-surface-700 dark:text-surface-300"><Fa icon={card.icon} size="lg" /></span
				>
				<p>{card.name}</p>
			</label>
		{/each}
		<p class="text-error-400">&nbsp;{cardTypeError}</p>
	</div>
	<label class="label">
		<span>Ange dina kortuppgifter</span>
		<div class="grid rounded-lg grid-rows-2 grid-cols-2">
			<input
				title="Kortnummer"
				class="input !rounded-b-none rounded-t-md col-span-2"
				type="number"
				name="cardNumber"
				placeholder="Kortnummer"
			/>
			<input
				title="Kortet är giltigt t.o.m."
				class="input border-r-transparent !rounded-t-none !rounded-br-none rounded-bl-md col-span-1"
				type="number"
				placeholder="MM / ÅÅ"
				disabled
			/>
			<input
				title="CVC"
				class="input !rounded-t-none !rounded-bl-none rounded-br-md col-span-1"
				type="number"
				placeholder="CVC"
				disabled
			/>
		</div>
		<p class="text-error-400">&nbsp;{cardNumberError}</p>
	</label>
	<label class="label">
		<span>Faktureringsadress</span>
		<div class="grid rounded-lg grid-rows-2 grid-cols-1">
			<select
				title="Land"
				class="select border-b-transparent !rounded-b-none rounded-t-md col-span-1"
				value="1"
				disabled
			>
				{#each countryOptions as option}
					<option value={option.value}>{option.name}</option>
				{/each}
			</select>
			<input
				title="Postnummer"
				class="input !rounded-t-none !rounded-t-none rounded-b-md col-span-1"
				type="number"
				placeholder="Postnummer"
				disabled
			/>
		</div>
		<p>&nbsp;</p>
	</label>
	<button
		class="max-w-fit btn bg-primary-500 text-white"
		aria-describedby="helper-text-explanation"
		type="submit">Spara</button
	>
	<p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
		Vi delar inte din data. Läs vår <a href="/blog/privacy-policy" class="font-medium anchor"
			>Integritetspolicy</a
		>.
	</p>
</form>

<style>
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
