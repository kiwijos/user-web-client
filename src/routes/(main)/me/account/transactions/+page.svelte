<script lang="ts">
	import type { PageData } from './$types';
	import { Table } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import type { PaginationSettings } from '@skeletonlabs/skeleton';
	import { formatDateReadable } from '$lib/services/dateFormatter';
	import type { Transaction } from '$lib/types/Transaction';
	import type { TransactionFormatted } from '$lib/types/TransactionFormatted';

	function onRowSelect(event: CustomEvent): void {
		console.log(event.detail);
	}

	export let data: PageData;

	const formattedTransactions: TransactionFormatted[] = data.transactions.map(
		(transaction: Transaction) => {
			const formattedDate = formatDateReadable(transaction.date);
			const formattedAmount = `${transaction.amount} kr`.replace('.', ',');

			return {
				...transaction,
				date_formatted: formattedDate,
				amount_formatted: formattedAmount
			};
		}
	);

	$: size = formattedTransactions.length;

	// Same goes for the pagination settings
	let paginationSettings: PaginationSettings;
	$: paginationSettings = {
		page: 0,
		limit: 5,
		size: size,
		amounts: [1, 2, 5, 10]
	};

	// Slice the data to fit the pagination
	$: sourceBodySliced = formattedTransactions.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	// These are visible in the UI
	$: sourceBodySlicedMapped = tableMapperValues(sourceBodySliced, [
		'date_formatted',
		'ref',
		'amount_formatted'
	]);

	// These are not visible in the UI at first, but are returned when a row is selected
	$: sourceBodyMetaSlicedMapped = tableMapperValues(sourceBodySliced, [
		'id',
		'user_id',
		'ref',
		'amount'
	]);

	let sourceHeaders: string[] = ['Datum', 'Ref', 'Pris']; // Table headers

	$: totalCost = sourceBodySliced.reduce(
		(acc: number, transaction: TransactionFormatted) => acc + transaction.amount,
		0
	);
	$: numberOfTransactions = sourceBodySliced.length;

	let table: TableSource;
	$: table = {
		head: sourceHeaders,
		body: sourceBodySlicedMapped,
		meta: sourceBodyMetaSlicedMapped,
		foot: [
			`<code class="code">${numberOfTransactions} resor</code>`,
			'',
			`<code class="code">${totalCost} kr</code>`
		]
	};
</script>

<div class="space-y-4">
	<Paginator
		bind:settings={paginationSettings}
		showFirstLastButtons={false}
		showPreviousNextButtons={true}
		amountText="Resor"
		separatorText="av"
		select="text-xs sm:text-sm dark:bg-surface-800 rounded-lg dark:border-surface-800"
		controlVariant="text-xs sm:text-sm dark:bg-surface-800"
		class="!flex-row gap-2 !space-x-0 !space-y-0 [&>label]:w-fit"
	/>
	<div class="overflow-x-scroll">
		<Table
			source={table}
			interactive={true}
			on:selected={onRowSelect}
			text="text-xs"
			regionHeadCell="uppercase"
			regionFootCell="lowercase"
		/>
	</div>
</div>
