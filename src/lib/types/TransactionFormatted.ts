import type { Transaction } from '$lib/types/Transaction';

export interface TransactionFormatted extends Transaction {
	date_formatted: string;
	amount_formatted: string;
}
