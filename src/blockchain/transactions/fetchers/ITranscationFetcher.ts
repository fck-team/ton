import { Account } from "../../wallets/Account.js";
import { Transaction } from "../Transaction.js";

export interface ITransactionsFetcher {
    account: Account;
    fetchTransactions(limit: number): Promise<Transaction[]>;
}
