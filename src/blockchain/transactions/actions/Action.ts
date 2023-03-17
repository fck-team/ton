import { ActionType } from "./ActionType.js";
import { Account } from "../../wallets/Account.js";

export abstract class Action {

    protected _type: ActionType;

    constructor(type: ActionType) {
        this._type = type;
    }
}