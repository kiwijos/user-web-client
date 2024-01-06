<script lang="ts">
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Fa from 'svelte-fa';
	import { faXmark } from '@fortawesome/free-solid-svg-icons';
	import { faCcMastercard, faCcVisa, faCcAmex } from '@fortawesome/free-brands-svg-icons';

	const cardOptions = [
		{ name: 'Mastercard', icon: faCcMastercard },
		{ name: 'Visa', icon: faCcVisa },
		{ name: 'American Express', icon: faCcAmex }
	];
	export let data: PageData;
</script>

<div class="">
	<div class="space-y-8">
		<div class="flex space-x-4 items-start">
			<Avatar background="bg-gray-300 dark:bg-surface-600" initials={$page.data.user.email[0]} />
			<div>
				<p class="text-2xl capitalize">{$page.data.user.email.split('@')[0]}</p>
				<p class="text-gray-500 dark:text-gray-400">{$page.data.user.email}</p>
			</div>
		</div>
		{#if data?.card}
			<a
				href="/me/account/payment"
				class="p-2 card card-hover h-28 w-52 border-2 border-primary-500 dark:border-tertiary-700 grid grid-cols-3 grid-rows-3 rounded-container-token bg-gradient-to-br from-primary-500 via-tertiary-300 to-secondary-400 dark:from-tertiary-800 dark:via-tertiary-900 dark:to-primary-800"
			>
				<div
					class="text-2xl col-start-3 row-start-1 justify-self-end text-white dark:text-primary-200"
				>
					<Fa icon={cardOptions[data.card.card_type - 1].icon} />
				</div>
				<p
					class="text-white dark:text-primary-200 text-center text-sm text-shadow text-shadow-sm shadow-primary-900 col-span-3 row-start-3"
				>
					{data.card.card_nr
						? `${data.card.card_nr.substring(0, 4)} XXXX XXXX XXXX`
						: 'Kortnummer saknas'}
				</p>
			</a>
			<div class="flex gap-4"></div>
		{:else}
			<div class="p-4 rounded-lg variant-soft-primary w-52 space-y-2" role="alert">
				<div class="flex items-center mb-3">
					<span class="badge rounded bg-primary-500 text-white">Kom igång!</span>
					<button
						type="button"
						class="ms-auto -mx-1.5 -my-1.5 btn-icon w-8 h-8 variant-soft-primary flex"
						aria-label="Fakeknapp för att stänga varning"
					>
						<Fa icon={faXmark} />
						<span class="sr-only">Den här knappen funkar inte</span>
					</button>
				</div>
				<p class="text-sm text-blue-800 dark:text-blue-400">
					Ställ in kortuppgifter för att kunna hyra elsparkcyklar i appen.
				</p>
				<a
					class="inline-block text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
					href="/me/account/payment">Ställ in kortuppgifter</a
				>
			</div>
		{/if}
	</div>
</div>
