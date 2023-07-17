import {Cell} from "ton-core";
import { Action } from "./Action.js";
import { ActionType } from "./ActionType.js";

export class JettonExcessesAction extends Action {
    constructor(op?: number, body?: Cell) {
        super(ActionType.jetton_excesses, op, body);
    }
}
