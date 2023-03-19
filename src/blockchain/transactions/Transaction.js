"use strict";
exports.__esModule = true;
exports.Transaction = void 0;
var Transaction = /** @class */ (function () {
    function Transaction(account, time, fee, hash, lt, compute_exit_code, action_result_code, in_msg, out_msgs) {
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
    return Transaction;
}());
exports.Transaction = Transaction;
