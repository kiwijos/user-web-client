import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// TODO: check if user is already logged in
};

const updatePaymentMethod: Action = async ({ request }) => {
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

	throw redirect(303, '/me/account');
};

export const actions: Actions = { updatePaymentMethod };
