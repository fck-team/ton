import { Action } from "./Action.js";
import { ActionType } from "./ActionType.js";

export class DedustLPNotificationAction extends Action {
    constructor() {
        super(ActionType.dedust_lp_notification);
    }
}
