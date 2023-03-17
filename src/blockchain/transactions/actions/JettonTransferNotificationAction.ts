import { ActionType } from "./ActionType.js";
import { Action } from "./Action.js";
import { Account } from "../../wallets/Account.js";

export class JettonTransferNotificationAction extends Action {

    protected _amount: bigint;
    protected _sender: Account;

    constructor(amount: bigint, sender: Account) {
        super(ActionType.jetton_transfer);
        this._amount = amount;
        this._sender = sender;
    }

    public get type() {
        return this._type;
    }

    public get amount() {
        return this._amount;
    }

    public get sender() {
        return this._sender;
    }
}