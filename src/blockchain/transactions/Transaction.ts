import { Account } from "../wallets/Account";
import { Message } from "./Message.js";

export class Transaction {
    account: Account
    time: Date
    fee: bigint
    hash: string
    lt: string
    compute_exit_code: Number
    action_result_code: Number
    in_msg: Message
    out_msgs: Array<Message>

    constructor(account: Account, time: Date, fee: bigint, hash: string, lt: string, compute_exit_code: Number, action_result_code: Number, in_msg: Message, out_msgs: Array<Message>)
    {
        this.account = account;
        this.time = time;
        this.fee = fee;
        this.hash = hash;
        this.lt = lt;
        this.compute_exit_code = compute_exit_code;
        this.action_result_code = action_result_code;
        this.in_msg = in_msg;
        this.out_msgs = out_msgs;
    }
}