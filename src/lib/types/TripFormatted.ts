import type { Trip } from '$lib/types/Trip';

export interface TripFormatted extends Trip {
	time_difference_milliseconds: number;
	time_difference_formatted: string;
	start_time_formatted: string;
	end_time_formatted: string;
	total_cost_formatted: string;
}
