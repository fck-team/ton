import { Address } from "ton-core";
import { Account } from "./blockchain/wallets/Account";
import { JettonWallet } from "./blockchain/wallets/JettonWallet.js";
import { TonCatTransactionFetcher } from "./blockchain/transactions/fetchers/TonCatTransactionFetcher.js";

const admin: string = "EQALyrWQNCxR3RFcape5ZMxClDHpySrEO93lQiaM9ZWUnAjW";
const account: Account = new JettonWallet(Address.parse(admin));
const fetcher: TonCatTransactionFetcher = new TonCatTransactionFetcher(account);

fetcher.fetchTransactions(1).then(console.log);