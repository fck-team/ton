import { ActionType } from "./ActionType.js";
import { Action } from "./Action.js";
import { Account } from "../../wallets/Account.js";

export class JettonExcessesAction extends Action {
    constructor() {
        super(ActionType.jetton_excesses);
    }
}