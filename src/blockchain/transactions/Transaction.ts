import { Account } from "../wallets/Account";
import { Message } from "./Message.js";

export class Transaction {
    public time: Date;
    public fee: bigint;
    public hash: string;
    public lt: string;
    // tslint:disable-next-line:variable-name
    public in_msg: Message|undefined;
    // tslint:disable-next-line:variable-name
    public out_msgs: Message[];

    // tslint:disable-next-line:variable-name
    constructor(time: Date, fee: bigint, hash: string, lt: string, in_msg: Message|undefined, out_msgs: Message[]) {
        this.time = time;
        this.fee = fee;
        this.hash = hash;
        this.lt = lt;
        this.in_msg = in_msg;
        this.out_msgs = out_msgs;
    }
}
