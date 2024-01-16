<script lang="ts">
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Fa from 'svelte-fa';
	import { faXmark } from '@fortawesome/free-solid-svg-icons';
	import UserNav from '$lib/components/UserNav.svelte';
	import { cardOptions } from '$lib/utils/cardOptions';

	export let data: PageData;

	const [balance, balanceDecimals] =
		typeof data?.balance === 'number' ? data.balance.toFixed(2).split('.') : ['0', '00'];
</script>

<div class="space-y-8">
	<div class="flex space-x-4 items-start">
		<Avatar background="bg-gray-200 dark:bg-surface-600" initials={$page.data.user.email[0]} />
		<div>
			<p class="text-2xl capitalize">{$page.data.user.email.split('@')[0]}</p>
			<p class="text-gray-500 dark:text-gray-400">{$page.data.user.email}</p>
		</div>
	</div>
	{#if data?.card !== undefined}
		<div class="flex flex-col-reverse xs:flex-row gap-4">
			<a
				href="/me/account/payment"
				class="p-2 card card-hover h-28 w-full sm:w-52 border-2 border-primary-500 dark:border-tertiary-700 grid grid-cols-3 grid-rows-3 rounded-container-token bg-gradient-to-br from-primary-500 via-tertiary-300 to-secondary-400 dark:from-tertiary-800 dark:via-tertiary-900 dark:to-primary-800"
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
						? `${data.card.card_nr.substring(0, 4)} •••• •••• ••••`
						: 'Kortnummer saknas'}
				</p>
			</a>
			<a
				href="/me/account/prepay"
				class="card card-hover h-28 variant-soft-success grow rounded-container-token flex items-center justify-center p-4 text-center text-surface-700 dark:text-surface-300 text-2xl font-bold"
			>
				<p class="text-success-900 dark:text-success-700 font-extrabold">
					<span class="text-4xl">{balance}</span>,<span class="text-2lg">{balanceDecimals}</span
					><span class="ml-2 text-4xl text-success-400 dark:text-success-900">kr</span>
				</p>
			</a>
		</div>
	{:else}
		<div class="p-4 rounded-lg variant-soft-primary w-full sm:w-52 space-y-2" role="alert">
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
	<UserNav
		asideClasses="block sm:hidden"
		itemHover="hover:bg-surface-100 hover:dark:bg-surface-700"
		container="card bg-gray-100 dark:bg-surface-800 rounded-container-token"
		lastItem="rounded-b-md"
		firstItem="rounded-t-md"
	/>
</div>
