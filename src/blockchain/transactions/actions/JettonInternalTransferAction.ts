import { ActionType } from "./ActionType.js";
import { Action } from "./Action.js";
import { Account } from "../../wallets/Account.js";

export class JettonInternalTransferAction extends Action {

    protected _amount: bigint;
    protected _source: Account;
    protected _destination: Account;

    constructor(amount: bigint, source: Account, destination: Account) {
        super(ActionType.jetton_internal_transfer);
        this._amount = amount;
        this._source = source;
        this._destination = destination;
    }

    public get type() {
        return this._type;
    }

    public get amount() {
        return this._amount;
    }

    public get source() {
        return this._source;
    }

    public get destination() {
        return this._destination;
    }
}