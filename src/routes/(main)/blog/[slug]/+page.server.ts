import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const title = params.slug.replace(/-/g, ' ');

	return { title };
};
