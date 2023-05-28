import { ActionType } from "./ActionType.js";
import { Action } from "./Action.js";
import { Account } from "../../wallets/Account.js";

export class UnknownAction extends Action {

    // tslint:disable-next-line:variable-name
    protected _op;

    // tslint:disable-next-line:variable-name
    constructor(op) {
        super(ActionType.unknown);
        this._op = op;
    }

    public get op() {
        return this._op;
    }
}
