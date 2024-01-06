import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { PUBLIC_REST_API_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch }) => {
	const response = await fetch(`${PUBLIC_REST_API_URL}/user/trips`, {
		method: 'POST'
	});

	const result = await response.json();

	if (!response.ok) {
		let message;
		if (result.errors?.detail) message = result.errors.detail;
		else if (result.errors?.message) message = result.errors.message;
		else message = String(result.errors);

		console.error(message);

		throw error(404, 'Kunde inte hitta resorna.');
	}

	return {
		trips: [
			{
				id: 1,
				user_id: 101,
				bike_id: 201,
				start_time: '2024-01-05T10:00:00',
				end_time: '2024-01-05T12:30:00',
				park_cost: 5.0,
				var_cost: 2.5,
				start_cost: 10.0,
				total_cost: 17.5,
				start_pos: [37.7749, -122.4194],
				end_pos: [37.7837, -122.4467]
			},
			{
				id: 2,
				user_id: 102,
				bike_id: 202,
				start_time: '2024-01-05T14:15:00',
				end_time: '2024-01-05T16:45:00',
				park_cost: 4.5,
				var_cost: 2.0,
				start_cost: 12.0,
				total_cost: 18.5,
				start_pos: [37.7614, -122.3886],
				end_pos: [37.7739, -122.4313]
			}
		]
	};
};
