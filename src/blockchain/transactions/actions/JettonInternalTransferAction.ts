import TonWeb from "@fck-foundation/tonweb-ts";
import {Cell} from "ton-core";
import { Account } from "../../wallets/Account.js";
import { Action } from "./Action.js";
import { ActionType } from "./ActionType.js";

export class JettonInternalTransferAction extends Action {

    // tslint:disable-next-line:variable-name
    protected _amount: bigint;
    // tslint:disable-next-line:variable-name
    protected _source: Account;
    // tslint:disable-next-line:variable-name
    protected _destination: Account;

    constructor(amount: bigint, source: Account, destination: Account, op?: number, body?: Cell) {
        super(ActionType.jetton_internal_transfer, op, body);
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
