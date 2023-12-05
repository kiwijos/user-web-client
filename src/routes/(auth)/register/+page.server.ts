import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// TODO: check if user is already logged in
};

const register: Action = async ({ request }) => {
	const data = await request.formData();

	const username = data.get('username');
	const email = data.get('email');
	const password = data.get('password');

	const errors = [];

	// Check username
	if (typeof username !== 'string' || !username) {
		errors.push({ field: 'username', message: 'Username is required' });
	} else if (username.length < 3) {
		errors.push({ field: 'username', message: 'Username must be at least 3 characters long' });
	} else if (username.length > 20) {
		errors.push({ field: 'username', message: 'Username must be at most 20 characters long' });
	} else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
		errors.push({
			field: 'username',
			message: 'Username can only contain letters, numbers and underscores'
		});
	}

	// Check email
	if (typeof email !== 'string' || !email) {
		errors.push({ field: 'email', message: 'Email is required' });
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		errors.push({ field: 'email', message: 'Email is invalid' });
	}

	// Check password
	if (typeof password !== 'string' || !password) {
		errors.push({ field: 'password', message: 'Password is required' });
	} else if (password.length < 8) {
		errors.push({ field: 'password', message: 'Password must be at least 8 characters long' });
	} else if (!/^[a-zA-Z0-9_]+$/.test(password)) {
		errors.push({
			field: 'password',
			message: 'Password can only contain letters, numbers and underscores'
		});
	}

	if (errors.length > 0) {
		return fail(400, { errors: errors });
	}

	throw redirect(303, '/login');
};

export const actions: Actions = { register };
