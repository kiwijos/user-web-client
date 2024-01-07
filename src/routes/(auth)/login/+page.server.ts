import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions } from './$types';

const login: Action = async ({ request }) => {
	const data = await request.formData();

	const email = data.get('email');
	const password = data.get('password');

	if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
		return fail(400, { invalid: true });
	}

	// redirect the user
	throw redirect(302, '/');
};

export const actions: Actions = { login };
