import { Action } from "./Action.js";
import { ActionType } from "./ActionType.js";

export class DedustSellAction extends Action {
    constructor() {
        super(ActionType.dedust_sell);
    }
}
