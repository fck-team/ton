import {Cell} from "ton-core";
import {OpCode} from "../OpCode.js";
import {DedustBuyAction} from "./actions/DedustBuyAction.js";
import {DedustJettonLiquidityDepositAction} from "./actions/DedustJettonLiquidityDepositAction.js";
import {DedustLiquidityDepositAction} from "./actions/DedustLiquidityDepositAction.js";
import {DedustLPNotificationAction} from "./actions/DedustLPNotificationAction.js";
import {DedustSellAction} from "./actions/DedustSellAction.js";
import {DedustSwapPoolNotificationAction} from "./actions/DedustSwapPoolNotificationAction.js";
import {JettonExcessesAction} from "./actions/JettonExcessesAction.js";
import {JettonTransferAction} from "./actions/JettonTransferAction.js";
import {JettonTransferNotificationAction} from "./actions/JettonTransferNotificationAction.js";
import {UnknownAction} from "./actions/UnknownAction.js";

export class ActionParser {
    public static parse(op: number, cell: Cell) {
        switch (op) {
            // Jetton standard
            case OpCode.jetton_transfer_notification:
                return JettonTransferNotificationAction.fromCell(cell);
            case OpCode.jetton_transfer:
                return JettonTransferAction.fromCell(cell);
            case OpCode.jetton_excesses:
                return {
                    action: new JettonExcessesAction(),
                    comment: "",
                };
            // DeDust
            case OpCode.dedust_jetton_liquidity_deposit:
                return {
                    action: new DedustJettonLiquidityDepositAction(),
                    comment: "",
                };
            case OpCode.dedust_buy:
                return {
                    action: new DedustBuyAction(),
                    comment: "",
                };
            case OpCode.dedust_sell:
                return {
                    action: new DedustSellAction(),
                    comment: "",
                };
            case OpCode.dedust_lp_notification:
                return {
                    action: new DedustLPNotificationAction(),
                    comment: "",
                };
            case OpCode.dedust_liquidity_deposit:
                return {
                    action: new DedustLiquidityDepositAction(),
                    comment: "",
                };
            case OpCode.dedust_swap_pool_notification:
                return {
                    action: new DedustSwapPoolNotificationAction(),
                    comment: "",
                };
            default:
                return {
                    action: new UnknownAction(op, cell),
                    comment: "",
                };
        }
    }
}
