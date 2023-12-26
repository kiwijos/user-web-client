import type { PageLoad } from './$types';

export const load: PageLoad = async ({ locals }) => {
	const cards = [
		{
			title: 'Elektrifiera din vardag',
			description:
				'Framtiden är här, och den är elektrisk! Ta steget in i en grönare vardag med våra toppmoderna elsparkcyklar. Uppgradera din pendlingsupplevelse nu!',
			link: '#',
			cta: 'Se våra elsparkcyklar'
		},
		{
			title: 'Ladda ner appen',
			description:
				'Ladda ner vår app för att enkelt kunna hitta och låsa upp våra elsparkcyklar. Du kan även hålla koll på dina betalningar och få en översikt över dina tidigare resor.',
			link: '/blog/app',
			cta: 'Ladda ner appen'
		},
		{
			title: 'Bli medlem',
			description:
				'Medlemskapet är helt gratis och du betalar endast för de resor du gör. Bli medlem idag och ta del av våra erbjudanden!',
			link: '#',
			cta: 'Bli medlem'
		}
	];

	if (locals?.user === null || !locals?.user) {
		cards.unshift({
			title: 'Hej kompis! 👋',
			description:
				'Frihet på två hjul är bara ett par knapptryck bort. Skapa ett konto och att börja åka idag!',
			link: '/login',
			cta: 'Skapa konto'
		});
	} else if (!locals?.user?.has_setup_payment) {
		cards.unshift({
			title: 'Lås upp ditt första åk! 💫',
			description:
				'För att hyra din första elsparkcykel behöver du ange ett betalsätt. Det gör du enkelt genom att gå till din profil. Oförglömliga åk väntar!',
			link: '/me/account/payment',
			cta: 'Lägg till kortuppgifter'
		});
	}

	return {
		props: {
			cards
		}
	};
};
