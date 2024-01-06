import { fail } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import { PUBLIC_REST_API_URL } from '$env/static/public';

export const load: PageServerLoad = async () => {};

const updatePaymentMethod: Action = async ({ request, fetch }) => {
	const data = await request.formData();

	const cardType = data.get('cardType');
	let cardNumber = data.get('cardNumber');

	const errors = [];

	// Check card type should be a value between 1 and 3
	if (typeof cardType !== 'string' || !cardType) {
		errors.push({ field: 'cardType', message: 'Du måste ange ett kort' });
	} else if (!['1', '2', '3'].includes(cardType)) {
		errors.push({ field: 'cardType', message: 'Kortet är inte giltigt' });
	}

	// remove all non-digits from card number
	cardNumber = cardNumber.replace(/\D/g, '');

	// Check card number should be 16 digits
	if (typeof cardNumber !== 'string' || !cardNumber) {
		errors.push({ field: 'cardNumber', message: 'Du måste ange ett 16-siffrigt kortnummer' });
	} else if (cardNumber.length !== 16) {
		errors.push({ field: 'cardNumber', message: 'Kortnumret måste vara 16 siffror långt' });
	}

	if (errors.length > 0) {
		return fail(400, { errors: errors });
	}

	const response = await fetch(`${PUBLIC_REST_API_URL}/user/card`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			card_type: cardType,
			card_nr: cardNumber
		})
	});

	if (!response.ok) {
		const result = await response.json();

		let message;
		if (result.errors?.detail) message = result.errors.detail;
		else if (result.errors?.message) message = result.errors.message;
		else message = String(result.errors);

		console.error(message);

		return fail(400, {
			errors: [{ field: 'cardNumber', message: 'Kunde inte uppdatera kortuppgifterna' }]
		});
	}

	return { success: true };
};

export const actions: Actions = { updatePaymentMethod };
