import { Action } from "./Action.js";
import { ActionType } from "./ActionType.js";

export class DedustBuyAction extends Action {
    constructor() {
        super(ActionType.dedust_buy);
    }
}
