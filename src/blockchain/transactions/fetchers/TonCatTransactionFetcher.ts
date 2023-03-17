import { TransactionsFetcher } from "./TranscationFetcher.js";
import { TonCatClient } from "../../../api_clients/TonCatClient.js";
import { Account } from "../../wallets/Account.js";
import { Address } from "ton-core";
import { Transaction } from "../Transaction.js";
import { Message } from "../Message.js";
import { WalletType } from "../../wallets/WalletType.js";
import { JettonWallet } from "../../wallets/JettonWallet.js";
import { UnknownWallet } from "../../wallets/UnknownWallet.js";
import { Wallet } from "../../wallets/Wallet.js";
import { ActionType } from "../actions/ActionType.js";
import { JettonInternalTransferAction } from "../actions/JettonInternalTransferAction.js";
import { JettonTransferAction } from "../actions/JettonTransferAction.js";
import { JettonTransferNotificationAction } from "../actions/JettonTransferNotificationAction.js";
import { JettonExcessesAction } from "../actions/JettonExcessesAction.js";
import { Action } from "../actions/Action.js";

export class TonCatTransactionFetcher extends TonCatClient implements TransactionsFetcher {
    account: Account;

    constructor(account: Account)
    {
        super();
        this.account = account;
    }

    private parseAction(actionFromResponse): Action {
        let type = actionFromResponse?.type;

        switch(type)
        {
            case ActionType.jetton_internal_transfer:
            {
                const amount = BigInt(actionFromResponse.amount);
                const source = new UnknownWallet(Address.parse(actionFromResponse.from));
                const destination = new UnknownWallet(Address.parse(actionFromResponse.response_address));

                return new JettonInternalTransferAction(amount, source, destination);
            }

            case ActionType.jetton_transfer:
            {
                const amount = BigInt(actionFromResponse.amount);
                const destination = new UnknownWallet(Address.parse(actionFromResponse.destination));
                const response_destination = new UnknownWallet(Address.parse(actionFromResponse.response_destination));

                return new JettonTransferAction(amount, destination, response_destination);
            }

            case ActionType.jetton_transfer_notification:
            {
                const amount = BigInt(actionFromResponse.amount);
                const sender = new UnknownWallet(Address.parse(actionFromResponse.sender));

                return new JettonTransferNotificationAction(amount, sender);
            }

            case ActionType.jetton_excesses:
                return new JettonExcessesAction();

            default:
                const msg = "Error: Action type: '" + actionFromResponse.type + "' is not implemented!";
                console.error(msg, actionFromResponse);
                throw new Error(msg);
        }
    }

    //было бы отлично это перенести в отдельный объект. Этот объект превращается в GodObject :\
    parseAccount(type: string, address: string): Account {
        let result = null;

        if(type == WalletType.jetton_wallet) result = new JettonWallet(Address.parse(address));
        else if(type == WalletType.wallet) result = new Wallet(Address.parse(address));
        else {
            console.warn("Warning: Account type: '" + type + "' is not implemented!")
            result = new UnknownWallet(Address.parse(address));
        };

        return result;
    }

    parseMessage(messageFromResponse): Message
    {
        let source: Account = this.parseAccount(messageFromResponse.source_type, messageFromResponse.source);
        let destination: Account = this.parseAccount(messageFromResponse.destination_type, messageFromResponse.destination);

        const value = BigInt(messageFromResponse.value);

        const actionData = messageFromResponse?.action;
        let action = null;
        if(actionData) action = this.parseAction(actionData);

        return new Message(source, destination, value, messageFromResponse.op, messageFromResponse.bounced, action, messageFromResponse.comment);
    }

    //говнокод, мне не нравится, но работает
    //UPD: говнокод уменьшился
    async fetchTransactions(limit: Number = 20, offset: Number = 0): Promise<Array<Transaction>> {
        const address: Address = this.account.address;
        const response = await this.get("contracts/address/" + address.toString() + "/transactions", {limit: limit, offset: offset});

        const data = response.data;
        let result = [];

        for(const item of data)
        {
            const time = new Date(item.utime * 1000);
            const fee = BigInt(item.fee);
            
            const out_msgs = new Array<Message>;
            for(const out_msg of item.out_msgs)
            {
                out_msgs.push(this.parseMessage(out_msg));
            }

            const in_msg = this.parseMessage(item.in_msg);

            let transaction: Transaction = new Transaction(this.account, time, fee, item.hash, item.lt, item.compute_exit_code, item.action_result_code, in_msg, out_msgs);
            result.push(transaction);
        }

        return result;
    }
}
