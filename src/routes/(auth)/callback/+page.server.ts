import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { PUBLIC_GITHUB_ID } from '$env/static/public';
import { GITHUB_SECRET } from '$env/static/private';

export const load: PageServerLoad = async ({ url, fetch, cookies }) => {
	const code = url.searchParams.get('code'); // Get the temporary code from the query string

	// Redirect to login if the user denies access or manually types in the url `/callback`
	if (typeof code !== 'string' || !code) {
		throw redirect(302, '/login');
	}

	// Exchange the code for a token by posting the code back to GitHub
	const response = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			client_id: PUBLIC_GITHUB_ID,
			client_secret: GITHUB_SECRET,
			code: code
		})
	});

	const result = await response.json();

	const accessToken = result.access_token;

	// Check if the user has granted access to their emails
	const scopes = result.scope.split(',');
	const hasUserEmailScope = scopes.includes('user:email') || scopes.includes('user');

	// Redirect to login if the user denies access to their emails
	if (hasUserEmailScope === false) {
		throw redirect(302, '/login');
	}

	cookies.set('session', accessToken, {
		path: '/',
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 30 // set cookie to expire after a month
	});

	// We only use this endpoint to autheticate the user, so we don't need to display anything, redirect to the dashboard instead
	throw redirect(302, '/');
};
