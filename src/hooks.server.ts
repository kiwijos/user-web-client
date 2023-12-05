import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const accessToken = event.cookies.get('session');

	// If there's no access token, just resolve the request as normal
	if (typeof accessToken !== 'string' || !accessToken) return await resolve(event);

	// Fetch the user data from the GitHub API
	const userResponse = await fetch('https://api.github.com/user', {
		headers: { Authorization: `Bearer ${accessToken}` }
	});

	// the user data contains things like the user's name, full name and avatar
	const userData = await userResponse.json();

	// fetch the user's email from GitHub API
	const emailResponse = await fetch('https://api.github.com/user/emails', {
		headers: { Authorization: `Bearer ${accessToken}` }
	});

	// the email data contains the user's emailaddressess and whether they are verified etc.
	const emails = await emailResponse.json();

	const primaryEmail = emails.find((email) => email.primary && email.verified)?.email || '';

	event.locals.user = {
		name: userData.login,
		email: primaryEmail,
		avatar: userData.avatar_url,
		has_setup_payment: false
	};

	return await resolve(event);
};
