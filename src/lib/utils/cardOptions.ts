import { faCcMastercard, faCcVisa, faCcAmex } from '@fortawesome/free-brands-svg-icons';

export const cardOptions = [
	{ name: 'Mastercard', value: '1', checked: true, icon: faCcMastercard },
	{ name: 'Visa', value: '2', checked: false, icon: faCcVisa },
	{ name: 'American Express', value: '3', checked: false, icon: faCcAmex }
];
