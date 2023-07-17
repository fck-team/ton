import {Cell} from "ton-core";
import { ActionType } from "./ActionType.js";

export abstract class Action {

    // tslint:disable-next-line:variable-name
    protected _type: ActionType;
    // tslint:disable-next-line:variable-name
    protected _op?: number;
    // tslint:disable-next-line:variable-name
    protected _body?: Cell;

    protected constructor(type: ActionType, op?: number, body?: Cell) {
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
