import {Cell} from "ton-core";
import {OpCode} from "../../OpCode.js";
import { Account } from "../../wallets/Account.js";
import {UnknownWallet} from "../../wallets/UnknownWallet.js";
import { Action } from "./Action.js";
import { ActionType } from "./ActionType.js";

export class JettonTransferNotificationAction extends Action {

    public get type() {
        return this._type;
    }

    public get amount() {
        return this._amount;
    }

    public get sender() {
        return this._sender;
    }
    public get query_id() {
        return this._query_id;
    }

    public static fromCell(cell: Cell) {
        const slice = cell.beginParse();
        const queryId = slice.loadUint(64);
        const amount = slice.loadCoins();
        const from = slice.loadAddress();
        const maybeRef = slice.loadBit();
        const payload = maybeRef ? slice.loadRef().beginParse() : slice;
        const payloadOp = payload.loadUint(32);
        let comment = "";
        if (payloadOp !== 0) {
            // Log.info("no text comment in transfer_notification");
        } else {
            const commentBody = payload.loadBuffer(payload.remainingBits / 8);
            const commentData = new TextDecoder().decode(commentBody);
            comment = commentData ? commentData : "";
        }

        const sender = new UnknownWallet(from);
        return {
            action: new JettonTransferNotificationAction(amount, sender, queryId, cell),
            comment,
        };
    }

    // tslint:disable-next-line:variable-name
    protected _amount: bigint;
    // tslint:disable-next-line:variable-name
    protected _sender: Account;
    // tslint:disable-next-line:variable-name
    protected _query_id: number;
    constructor(amount: bigint, sender: Account, queryId: number = 0, body?: Cell) {
        super(
            ActionType.jetton_transfer_notification,
            OpCode.jetton_transfer_notification,
            body,
        );
        this._amount = amount;
        this._sender = sender;
        this._query_id = queryId;
    }
}
