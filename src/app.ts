import { Address } from "ton-core";
import { Account } from "./blockchain/wallets/Account";
import { JettonWallet } from "./blockchain/wallets/JettonWallet.js";
import { TonCatTransactionFetcher } from "./blockchain/transactions/fetchers/TonCatTransactionFetcher.js";

const admin: string = "EQB-7nZY_Onatn-_s5J2Y9jDOxCjWFzwMOa4_MeuSbgPgnVO";
const account: Account = new JettonWallet(Address.parse(admin));
const fetcher: TonCatTransactionFetcher = new TonCatTransactionFetcher(account);

fetcher.fetchTransactions().then(console.log);