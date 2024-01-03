import {
	faCog,
	faCreditCard,
	// faMapMarkerAlt,
	faRoute,
	faWallet,
	faUser
} from '@fortawesome/free-solid-svg-icons';

export const accountLinks = [
	{ name: 'Profil', path: '/me/account' },
	{ name: 'Inställningar', path: '/me/account/settings' },
	{ name: 'Kortuppgifter', path: '/me/account/payment' },
	{ name: 'Betalningar', path: '/me/account/transactions' },
	{ name: 'Resehistorik', path: '/me/account/trips' }
];

export const accountLinksWithIcons = [
	{ name: 'Profil', path: '/me/account', icon: faUser },
	{ name: 'Inställningar', path: '/me/account/settings', icon: faCog },
	{ name: 'Kortuppgifter', path: '/me/account/payment', icon: faCreditCard },
	{ name: 'Betalningar', path: '/me/account/transactions', icon: faWallet },
	{ name: 'Resehistorik', path: '/me/account/trips', icon: faRoute }
];
