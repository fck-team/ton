import { Account } from "../../wallets/Account.js";
import { Transaction } from "../Transaction.js";

export interface TransactionsFetcher {
    account: Account
    
    fetchTransactions(): Promise<Array<Transaction>>;
}