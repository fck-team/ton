import TonWeb from "@fck-foundation/tonweb-ts";
import { ActionType } from "./ActionType.js";

export abstract class Action {

    // tslint:disable-next-line:variable-name
    protected _type: ActionType;
    // tslint:disable-next-line:variable-name
    protected _op?: number;
    // tslint:disable-next-line:variable-name
    protected _body?: TonWeb.boc.Cell;

    protected constructor(type: ActionType, op?: number, body?: TonWeb.boc.Cell) {
        this._type = type;
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
