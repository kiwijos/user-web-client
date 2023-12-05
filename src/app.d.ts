// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				name: string;
				email: string;
				avatar: string;
				has_setup_payment: boolean;
			};
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
