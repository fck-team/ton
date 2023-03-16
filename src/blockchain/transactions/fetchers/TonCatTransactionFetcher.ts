import { TransactionsFetcher } from "./TranscationFetcher.js";
import { TonCatClient } from "../../../api_clients/TonCatClient.js";
import { Account } from "../../wallets/Account.js";
import { Address } from "ton-core";
import { Transaction } from "../Transaction.js";
import { Message } from "../Message.js";
import { WalletType } from "../../wallets/WalletType.js";
import { JettonWallet } from "../../wallets/JettonWallet.js";
import { Wallet } from "../../wallets/Wallet.js";

export class TonCatTransactionFetcher extends TonCatClient implements TransactionsFetcher {
    account: Account;

    constructor(account: Account)
    {
        super();
        this.account = account;
    }

    //говнокод, мне не нравится, но работает
    async fetchTransactions(): Promise<Array<Transaction>> {
        const address: Address = this.account.address;
        const response = await this.get("contracts/address/" + address.toString() + "/transactions", {limit: 20, offset: 0});

        const data = response.data;
        let result = [];

        for(const item of data)
        {
            const time = new Date(item.utime * 1000);
            const fee = BigInt(item.fee);

            let source: Account = null;
            if(item.in_msg.source_type == WalletType.jetton_wallet) source = new JettonWallet(Address.parse(item.in_msg.source));
            else if(item.in_msg.source_type == WalletType.wallet) source = new Wallet(Address.parse(item.in_msg.source));

            let destination: Account = null;
            if(item.in_msg.source_type == WalletType.jetton_wallet) destination = new JettonWallet(Address.parse(item.in_msg.destination));
            else if(item.in_msg.source_type == WalletType.wallet) destination = new Wallet(Address.parse(item.in_msg.destination));

            const value = BigInt(item.in_msg.value);

            const in_msg = new Message(source, destination, value, item.in_msg.op, item.in_msg.bounced, item.in_msg.comment);

            //todo: out msgs
            let transaction: Transaction = new Transaction(this.account, time, fee, item.hash, item.lt, item.compute_exit_code, item.action_result_code, in_msg, []);
            result.push(transaction);
        }

        return result;
    }
}
