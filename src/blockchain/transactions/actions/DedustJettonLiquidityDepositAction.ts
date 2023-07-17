import {Cell} from "ton-core";
import { Action } from "./Action.js";
import { ActionType } from "./ActionType.js";

export class DedustJettonLiquidityDepositAction extends Action {
    constructor() {
        super(ActionType.dedust_jetton_liquidity_deposit);
    }
}
