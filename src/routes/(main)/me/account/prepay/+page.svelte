<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings, ToastStore } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { cardOptions } from '$lib/utils/cardOptions';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;

	const toastStore: ToastStore = getToastStore();

	const toastSettings: ToastSettings = {
		message: 'Överföringen lyckades!',
		timeout: 10000,
		background: 'variant-filled-primary',
		action: {
			label: 'Visa saldo',
			response: () => {
				goto('/me/account');
			}
		}
	};

	export let form: ActionData;

	let amountError: string = '';

	$: if (form?.errors) {
		amountError =
			form.errors.find((error: { field: string; message: string }) => error.field === 'amount')
				?.message ?? '';
	}

	$: if (form?.success) {
		toastStore.trigger(toastSettings);
	}

	let hasSetupPaymentMethod: boolean = typeof data?.card?.card_type === 'number';

	let canSubmit: boolean = false;

	const onValueChange = (e: Event) => {
		const value = Number((e.target as HTMLInputElement).value);
		if (value > 0) canSubmit = true;
		else canSubmit = false;
	};
</script>

<form action="?/prepay" method="POST" use:enhance class="flex flex-col space-y-4 max-w-xl">
	<label class="label">
		<span class="text-sm font-bold text-surface-700 dark:text-surface-300">Bankkonto</span>
		<div class="input-group input-group-divider grid-cols-[1fr_auto] rounded-container-token">
			<input
				type="text"
				placeholder={data?.card?.card_nr
					? `${data.card.card_nr.substring(0, 4)} •••• •••• ••••`
					: 'Konto saknas'}
				readonly
				title="Sparat konto"
			/>
			<div class="input-group-shim">
				{#if typeof data?.card?.card_type === 'number'}
					<Fa icon={cardOptions[data.card.card_type - 1].icon} scale={1.5} />
				{:else}
					<a href="/me/account/payment">Ändra</a>
				{/if}
			</div>
		</div>
		<p class="text-sm text-surface-700 dark:text-surface-300">
			Överför från ditt bankkonto till ditt konto hos oss. <a
				href="/me/account/payment"
				class="anchor">Ändra bankkonto</a
			>
		</p>
	</label>

	<label class="label">
		<span class="text-sm font-bold text-surface-700 dark:text-surface-300">Belopp</span>
		<input
			class="input"
			title="Input (belopp)"
			type="number"
			placeholder="Ange belopp"
			name="amount"
			on:change={onValueChange}
			disabled={!hasSetupPaymentMethod}
		/>
		<p class="text-error-400 text-xs">&nbsp; {amountError || ''}</p>
	</label>
	<button
		class="max-w-fit btn bg-primary-500 text-white"
		disabled={!hasSetupPaymentMethod || !canSubmit}
		title="Överför"
		type="submit">Överför</button
	>
</form>
