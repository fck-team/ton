"use strict";
exports.__esModule = true;
exports.Message = void 0;
var Message = /** @class */ (function () {
    /* TODO:
    action: {
        type: 'jetton:internal_transfer',
        query_id: '0',
        amount: '4332000',
        from: 'EQClQvHmqPaSini7ztSApvlKxfrhq3J3jXA10in6je4w0pN2',
        response_address: 'EQClQvHmqPaSini7ztSApvlKxfrhq3J3jXA10in6je4w0pN2',
        forward_ton_amount: '1'
    },
    */
    //action: Object 
    function Message(source, destination, value, op, bounced, action, comment) {
        this._source = source;
        this._destination = destination;
        this._value = value;
        this._op = op;
        this._comment = comment;
        this._bounced = bounced;
        this._action = action;
    }
    Object.defineProperty(Message.prototype, "source", {
        get: function () {
            return this._source;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "destination", {
        get: function () {
            return this._destination;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "op", {
        get: function () {
            return this._op;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "comment", {
        get: function () {
            return this._comment;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "bounced", {
        get: function () {
            return this._bounced;
        },
        enumerable: false,
        configurable: true
    });
    return Message;
}());
exports.Message = Message;
