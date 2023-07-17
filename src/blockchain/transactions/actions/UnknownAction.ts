import {Cell} from "ton-core";
import { Action } from "./Action.js";
import { ActionType } from "./ActionType.js";

export class UnknownAction extends Action {
    constructor(op: number, body?: Cell) {
        super(ActionType.unknown, op, body);
    }
}
