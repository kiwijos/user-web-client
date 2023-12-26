import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.user || process.env.NODE_ENV === 'test') return;

	throw redirect(302, '/login');
};
