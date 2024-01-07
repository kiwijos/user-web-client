import { fail } from '@sveltejs/kit';
import type { Action, Actions } from './$types';
import { PUBLIC_REST_API_URL } from '$env/static/public';

const prepay: Action = async ({ request, fetch }) => {
	const data = await request.formData();

	let amount = data.get('amount');

	// Check amount should be a value larger than 0
	if (typeof amount !== 'string' || !amount) {
		return fail(400, { errors: [{ field: 'amount', message: 'Ange ett belopp' }] }); // return early to avoid checks that are dependent on the amount being a number
	}

	try {
		amount = amount.replace(',', '.');
		amount = parseFloat(amount);
	} catch (e) {
		return fail(400, { errors: [{ field: 'amount', message: 'Beloppet är inte giltigt' }] });
	}

	if (amount < 0) {
		return fail(400, { errors: [{ field: 'amount', message: 'Beloppet måste vara större än 0' }] });
	}

	const response = await fetch(`${PUBLIC_REST_API_URL}/user/payment`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			amount: amount
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
			errors: [{ field: 'amount', message: 'Kunde inte genomföra betalningen' }]
		});
	}

	return { success: true };
};

export const actions: Actions = { prepay };
