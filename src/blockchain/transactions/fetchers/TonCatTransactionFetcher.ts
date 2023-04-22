import { Address } from "ton-core";
import { TonCatClient } from "../../../api_clients/TonCatClient.js";
import {Log} from "../../../logs/Log.js";
import { JettonMetadata } from "../../jettons/JettonMetadata.js";
import { Account } from "../../wallets/Account.js";
import { JettonWallet } from "../../wallets/JettonWallet.js";
import { NftItem } from "../../wallets/NftItem.js";
import { TelegramUsername } from "../../wallets/TelegramUsername.js";
import { UnknownWallet } from "../../wallets/UnknownWallet.js";
import { Wallet } from "../../wallets/Wallet.js";
import { WalletType } from "../../wallets/WalletType.js";
import { Action } from "../actions/Action.js";
import { ActionType } from "../actions/ActionType.js";
import { JettonExcessesAction } from "../actions/JettonExcessesAction.js";
import { JettonInternalTransferAction } from "../actions/JettonInternalTransferAction.js";
import { JettonTransferAction } from "../actions/JettonTransferAction.js";
import { JettonTransferNotificationAction } from "../actions/JettonTransferNotificationAction.js";
import { Message } from "../Message.js";
import { Transaction } from "../Transaction.js";
import { ITransactionsFetcher } from "./TranscationFetcher.js";

export class TonCatTransactionFetcher extends TonCatClient implements ITransactionsFetcher {
    public account: Account;

    constructor(account: Account) {
        super();
        this.account = account;
    }

    // было бы отлично это перенести в отдельный объект. Этот объект превращается в GodObject :\
    public parseAccount(type: string, address: string): Account {
        let result: null | JettonWallet = null;

        switch (type) {
            case WalletType.jetton_wallet:
                result = new JettonWallet(Address.parse(address));
                break;
            case WalletType.wallet:
                result = new Wallet(Address.parse(address));
                break;
            case WalletType.telegram_username:
                result = new TelegramUsername(Address.parse(address));
                break;
            case WalletType.nft_item:
                result = new NftItem(Address.parse(address));
                break;
            case null:
                result = null;
                break;
            default:
                Log.warn("Warning: Account type: '" + type + "' is not implemented! Address: " + address);
                result = new UnknownWallet(Address.parse(address));
                break;
        }

        return result as Account;
    }

    public parseJettonMetadata(messageFromResponse) {
        const meta = messageFromResponse?.meta;
        if (meta == null) { return null; }

        const jetton = meta?.jetton;
        if (jetton == null) { return null; }

        const address = Address.parse(meta.jetton_address);
        // tslint:disable-next-line:max-line-length
        return new JettonMetadata(address, jetton.decimals, jetton.symbol, jetton.name, jetton.image.w216, jetton.description);
    }

    public parseMessage(messageFromResponse): Message {
        const source: Account = this.parseAccount(messageFromResponse.source_type, messageFromResponse.source);
        // tslint:disable-next-line:max-line-length
        const destination: Account = this.parseAccount(messageFromResponse.destination_type, messageFromResponse.destination);

        const value = BigInt(messageFromResponse.value);

        const actionData = messageFromResponse?.action;
        let action: null | Action = null;
        if (actionData) { action = this.parseAction(actionData); }

        const jetton = this.parseJettonMetadata(messageFromResponse);

        // tslint:disable-next-line:max-line-length
        return new Message(source, destination, value, messageFromResponse.bounced, action, messageFromResponse.comment, jetton);
    }

    // говнокод, мне не нравится, но работает
    // UPD: говнокод уменьшился
    public async fetchTransactions(limit: number = 20, offset: number = 0): Promise<Transaction[]> {
        const address: Address = this.account.address;
        // tslint:disable-next-line:max-line-length
        const response = await this.get("contracts/address/" + address.toString() + "/transactions", {limit, offset});
        const data = response.data;
        const result: Transaction[] = [];

        for (const item of data) {
            const time = new Date(item.utime * 1000);
            const fee = BigInt(item.fee);

            // tslint:disable-next-line:variable-name new-parens
            const out_msgs = new Array<Message>;
            // tslint:disable-next-line:variable-name
            for (const out_msg of item.out_msgs) {
                out_msgs.push(this.parseMessage(out_msg));
            }

            // tslint:disable-next-line:variable-name
            const in_msg = this.parseMessage(item.in_msg);

            // tslint:disable-next-line:max-line-length
            const transaction: Transaction = new Transaction(time, fee, item.hash, item.lt, in_msg, out_msgs);
            result.push(transaction);
        }

        return result;
    }

    private parseAction(actionFromResponse): Action|null {
        const type = actionFromResponse?.type;

        switch (type) {
            case ActionType.jetton_internal_transfer: {
                const amount = BigInt(actionFromResponse.amount);
                const source = new UnknownWallet(Address.parse(actionFromResponse.from));
                const destination = new UnknownWallet(Address.parse(actionFromResponse.response_address));

                return new JettonInternalTransferAction(amount, source, destination);
            }

            case ActionType.jetton_transfer: {
                const amount = BigInt(actionFromResponse.amount);

                let destination: null | UnknownWallet = null;
                // tslint:disable-next-line:variable-name
                let response_destination: null | UnknownWallet = null;

                // tslint:disable-next-line:max-line-length
                if (actionFromResponse.destination) { destination = new UnknownWallet(Address.parse(actionFromResponse.destination)); }
                // tslint:disable-next-line:max-line-length
                if (actionFromResponse.response_destination) { response_destination = new UnknownWallet(Address.parse(actionFromResponse.response_destination)); }

                return new JettonTransferAction(amount, destination as Account, response_destination as Account);
            }

            case ActionType.jetton_transfer_notification: {
                const amount = BigInt(actionFromResponse.amount);
                let sender: null | UnknownWallet = null;

                if (actionFromResponse.sender) { sender = new UnknownWallet(Address.parse(actionFromResponse.sender)); }

                return new JettonTransferNotificationAction(amount, sender as Account);
            }

            case ActionType.jetton_excesses:
                return new JettonExcessesAction();

            default:
                const msg = "Action type: '" + actionFromResponse.type + "' is not implemented!";
                Log.warn(msg);
                Log.warn(msg);
                return null;
        }
    }
}
