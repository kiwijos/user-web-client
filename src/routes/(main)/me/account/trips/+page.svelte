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

	function onRowSelect(event: CustomEvent): void {
		console.log(event.detail);
	}

	export let data: PageData;

	const formattedTrips: TripFormatted[] = data.trips.map((trip: Trip) => {
		const timeDifference = calculateTimeDifference(trip.start_time, trip.end_time);
		const formattedTimeDifference = formatMilliseconds(timeDifference);
		const formattedStartTime = formatDateReadable(trip.start_time);
		const formattedEndTime = formatDateReadable(trip.end_time);
		const formattedTotalCost = `${trip.total_cost} kr`.replace('.', ',');

		return {
			...trip,
			start_time_formatted: formattedStartTime,
			end_time_formatted: formattedEndTime,
			time_difference_milliseconds: timeDifference,
			time_difference_formatted: formattedTimeDifference,
			total_cost_formatted: formattedTotalCost
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
		'user_id',
		'bike_id',
		'start_time',
		'end_time',
		'park_cost',
		'var_cost',
		'start_cost',
		'total_cost',
		'start_pos',
		'end_pos'
	]);

	let sourceHeaders: string[] = ['Datum', 'Tid', 'Pris']; // Table headers

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
