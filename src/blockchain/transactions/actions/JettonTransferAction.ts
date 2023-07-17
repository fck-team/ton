import {Cell} from "ton-core";
import {OpCode} from "../../OpCode.js";
import { Account } from "../../wallets/Account.js";
import {UnknownWallet} from "../../wallets/UnknownWallet.js";
import { Action } from "./Action.js";
import { ActionType } from "./ActionType.js";

export class JettonTransferAction extends Action {

    public get type() {
        return this._type;
    }

    public get amount() {
        return this._amount;
    }

    public get destination() {
        return this._destination;
    }

    public get response_destination() {
        return this._response_destination;
    }
    public get query_id() {
        return this._query_id;
    }

    public static fromCell(cell: Cell) {
        const slice = cell.beginParse();
        const queryId = slice.loadUint(64);
        const amount = slice.loadCoins();
        const destination = slice.loadAddress();
        const respDestination = slice.loadAddress();
        const maybePayload = slice.loadBit();
        const payload = maybePayload ? slice.loadRef().beginParse() : slice;
        const payloadOp = payload.loadUint(32);
        let comment = "";
        if (payloadOp !== 0) {
            // Log.info("no text comment in transfer_notification");
        } else {
            const commentBody = payload.loadBuffer(payload.remainingBits / 8);
            const commentData = new TextDecoder().decode(commentBody);
            comment = commentData ? commentData : "";
        }
        const dest = new UnknownWallet(destination);
        let respDest: Account|null = null;
        if (respDestination) {
            respDest = new UnknownWallet(respDestination);
        }
        return {action: new JettonTransferAction(amount, dest, respDest, queryId, cell), comment};
    }

    // tslint:disable-next-line:variable-name
    protected _amount: bigint;
    // tslint:disable-next-line:variable-name
    protected _destination: Account;
    // tslint:disable-next-line:variable-name
    protected _response_destination: Account|null;
    // tslint:disable-next-line:variable-name
    protected _query_id: number;

    // tslint:disable-next-line:variable-name
    constructor(amount: bigint,
                destination: Account,
                responseDestination: Account|null,
                queryId: number = 0,
                body?: Cell) {
        super(ActionType.jetton_transfer, OpCode.jetton_transfer, body);
        this._amount = amount;
        this._destination = destination;
        this._response_destination = responseDestination;
        this._query_id = queryId;
    }
}
