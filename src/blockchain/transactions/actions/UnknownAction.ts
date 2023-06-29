import TonWeb from "@fck-foundation/tonweb-ts";
import { Action } from "./Action.js";
import { ActionType } from "./ActionType.js";

export class UnknownAction extends Action {

    // tslint:disable-next-line:variable-name
    protected _op;
    // tslint:disable-next-line:variable-name
    protected _body: TonWeb.boc.Cell;

    // tslint:disable-next-line:variable-name
    constructor(op, body) {
        super(ActionType.unknown);
        this._op = op;
        this._body = body;
    }

    public get op() {
        return this._op;
    }
    public get body() {
        return this._body;
    }
}
