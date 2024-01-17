<script lang="ts">
	import type { PageData } from './$types';
	import { Table } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import type { PaginationSettings } from '@skeletonlabs/skeleton';

	import {
		calculateTimeDifference,
		formatDateReadable,
		formatMilliseconds
	} from '$lib/services/dateFormatter';
	import type { Trip } from '$lib/types/Trip';
	import type { TripFormatted } from '$lib/types/TripFormatted';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	const modal: ModalSettings = {
		type: 'component',
		component: 'modalTable',
		title: 'Din resa',
		body: ''
	};

	export let data: PageData;

	const formatCost = (cost: number) => {
		return `${cost.toFixed(2)} kr`.replace('.', ',');
	};

	const formattedTrips: TripFormatted[] = data.trips.map((trip: Trip) => {
		const timeDifference = calculateTimeDifference(trip.start_time, trip.end_time);
		const formattedTimeDifference = formatMilliseconds(timeDifference);
		const formattedStartTime = formatDateReadable(trip.start_time);
		const formattedEndTime = formatDateReadable(trip.end_time);
		const formattedTotalCost = formatCost(trip.total_cost);
		const formattedStartCost = formatCost(trip.start_cost);
		const formattedVarCost = formatCost(trip.var_cost);
		const formattedParkingCost = formatCost(trip.park_cost);

		const formattedStartPos = `Lat. ${trip.start_pos[1]}, Lon. ${trip.start_pos[0]}`;
		const formattedEndPos = `Lat. ${trip.end_pos[1]}, Lon. ${trip.end_pos[0]}`;

		return {
			...trip,
			start_time_formatted: formattedStartTime,
			end_time_formatted: formattedEndTime,
			time_difference_milliseconds: timeDifference,
			time_difference_formatted: formattedTimeDifference,
			total_cost_formatted: formattedTotalCost,
			start_cost_formatted: formattedStartCost,
			var_cost_formatted: formattedVarCost,
			park_cost_formatted: formattedParkingCost,
			start_pos_formatted: formattedStartPos,
			end_pos_formatted: formattedEndPos
		};
	});

	$: size = formattedTrips.length;

	// Same goes for the pagination settings
	let paginationSettings: PaginationSettings;
	$: paginationSettings = {
		page: 0,
		limit: 5,
		size: size,
		amounts: [1, 2, 5, 10]
	};

	// Slice the data to fit the pagination
	$: sourceBodySliced = formattedTrips.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	// These are visible in the UI
	$: sourceBodySlicedMapped = tableMapperValues(sourceBodySliced, [
		'start_time_formatted',
		'time_difference_formatted',
		'total_cost_formatted'
	]);

	// These are not visible in the UI at first, but are returned when a row is selected
	$: sourceBodyMetaSlicedMapped = tableMapperValues(sourceBodySliced, [
		'id',
		'bike_id',
		'start_time_formatted',
		'end_time_formatted',
		'total_cost_formatted',
		'start_cost_formatted',
		'var_cost_formatted',
		'park_cost_formatted',
		'start_pos_formatted',
		'end_pos_formatted'
	]);

	let sourceHeaders: string[] = ['Startdatum', 'Resetid', 'Total kostnad']; // Table headers

	let sourceMetaHeaders: string[] = [
		'Resenr',
		'Cykelnr',
		'Startdatum',
		'Slutdatum',
		'Total kostnad',
		'(varav startavgift)',
		'(varav tidsavgift)',
		'(varav parkering)',
		'Startposition',
		'Slutposition'
	]; // Table headers for meta data used in modal

	function onRowSelect(event: CustomEvent): void {
		let modalData = { headers: sourceMetaHeaders, values: event.detail };
		modal.meta = modalData;
		modalStore.trigger(modal);
	}

	// sum of visible trips total_cost
	$: totalCost = sourceBodySliced.reduce(
		(acc: number, trip: TripFormatted) => acc + trip.total_cost,
		0
	);
	$: numberOfTrips = sourceBodySliced.length;
	$: totalTime = sourceBodySliced.reduce(
		(acc: number, trip: TripFormatted) => acc + trip.time_difference_milliseconds,
		0
	);

	let table: TableSource;
	$: table = {
		head: sourceHeaders,
		body: sourceBodySlicedMapped,
		meta: sourceBodyMetaSlicedMapped,
		foot: [
			`<code class="code">${numberOfTrips} resor</code>`,
			`<code class="code">${formatMilliseconds(totalTime)}</code>`,
			`<code class="code">${totalCost.toFixed(2)} kr</code>`
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
