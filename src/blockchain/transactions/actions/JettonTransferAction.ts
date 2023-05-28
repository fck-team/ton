import { ActionType } from "./ActionType.js";
import { Action } from "./Action.js";
import { Account } from "../../wallets/Account.js";

export class JettonTransferAction extends Action {

    // tslint:disable-next-line:variable-name
    protected _amount: bigint;
    // tslint:disable-next-line:variable-name
    protected _destination: Account;
    // tslint:disable-next-line:variable-name
    protected _response_destination: Account|null;

    // tslint:disable-next-line:variable-name
    constructor(amount: bigint, destination: Account, response_destination: Account|null) {
        super(ActionType.jetton_transfer);
        this._amount = amount;
        this._destination = destination;
        this._response_destination = response_destination;
    }

    public get type() {
        return this._type;
    }

    public get amount() {
        return this._amount;
    }

    public get destination() {
        return this._destination;
    }

    public get response_destination() {
        return this._response_destination;
    }
}