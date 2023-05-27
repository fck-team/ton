import { Action } from "./Action.js";
import { ActionType } from "./ActionType.js";

export class DedustLiquidityDepositAction extends Action {
    constructor() {
        super(ActionType.dedust_liquidity_deposit);
    }
}
