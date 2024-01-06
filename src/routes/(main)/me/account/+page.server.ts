import type { PageServerLoad } from './$types';
import { PUBLIC_REST_API_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch }) => {
	let cardDetails;

	try {
		const response = await fetch(`${PUBLIC_REST_API_URL}/user/card`);

		cardDetails = await response.json();

		if (!response.ok) {
			// When the response is not OK, the server will return an `errors` object
			// In the case of no card, the server will return a 404 status code (that's the plan anyway)
			let message;
			if (cardDetails.errors?.detail) message = cardDetails.errors.detail;
			else if (cardDetails.errors?.message) message = cardDetails.errors.message;
			else message = String(cardDetails.errors);

			console.error(
				`Server responded with an error when requesting card details: (${response.status}) ${message}`
			);

			// This is an expected error, thrown when the user has no card for example
			return {
				card: null // <-- we don't want to return the error object to the client, simply return null
			};
		}
	} catch (error) {
		// These are unexpected errors, thrown when the server is unreachable, the response cannot be parsed, etc.
		let message;
		if (error instanceof Error) message = error.message;
		else message = String(error);

		console.error(`An unexpected error occurred when requesting card details: ${message}`);

		return {
			card: null
		};
	}

	return {
		card: cardDetails
	};
};
