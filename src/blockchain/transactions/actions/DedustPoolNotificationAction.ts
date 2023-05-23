import { Action } from "./Action.js";
import { ActionType } from "./ActionType.js";

export class DedustPoolNotificationAction extends Action {
    constructor() {
        super(ActionType.dedust_pool_notification);
    }
}
