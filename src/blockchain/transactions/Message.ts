import { JettonMetadata } from "../jettons/JettonMetadata";
import { Account } from "../wallets/Account";
import { Action } from "./actions/Action";

export class Message {
    public set destination(value: Account) {
        this._destination = value;
    }
    // tslint:disable-next-line:variable-name
    protected _source: Account;
    // tslint:disable-next-line:variable-name
    protected _destination: Account;
    // tslint:disable-next-line:variable-name
    protected _value: bigint;
    // tslint:disable-next-line:variable-name
    protected _comment?: string;
    // tslint:disable-next-line:variable-name
    protected _bounced: boolean;
    // tslint:disable-next-line:variable-name
    protected _action?: Action | null;
    // tslint:disable-next-line:variable-name
    protected _jetton?: JettonMetadata | null;

    constructor(source: Account,
                destination: Account,
                value: bigint,
                bounced: boolean,
                action?: Action | null,
                comment?: string,
                jetton?: JettonMetadata | null) {
        this._source = source;
        this._destination = destination;
        this._value = value;
        this._comment = comment;
        this._bounced = bounced;
        this._action = action;
        this._jetton = jetton;
    }

    public get jetton() {
        return this._jetton;
    }

    public get source() {
        return this._source;
    }

    // tslint:disable-next-line:adjacent-overload-signatures
    public get destination() {
        return this._destination;
    }

    public get value() {
        return this._value;
    }

    public get comment() {
        return this._comment;
    }

    public get bounced() {
        return this._bounced;
    }

    public get action() {
        return this._action;
    }
}
