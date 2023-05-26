import { Action } from "./Action.js";
import { ActionType } from "./ActionType.js";

export class DedustSwapPoolNotificationAction extends Action {
    constructor() {
        super(ActionType.dedust_swap_pool_notification);
    }
}
