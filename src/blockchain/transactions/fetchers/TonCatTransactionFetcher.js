"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TonCatTransactionFetcher = void 0;
var TonCatClient_js_1 = require("../../../api_clients/TonCatClient.js");
var ton_core_1 = require("ton-core");
var Transaction_js_1 = require("../Transaction.js");
var Message_js_1 = require("../Message.js");
var WalletType_js_1 = require("../../wallets/WalletType.js");
var JettonWallet_js_1 = require("../../wallets/JettonWallet.js");
var UnknownWallet_js_1 = require("../../wallets/UnknownWallet.js");
var Wallet_js_1 = require("../../wallets/Wallet.js");
var ActionType_js_1 = require("../actions/ActionType.js");
var JettonInternalTransferAction_js_1 = require("../actions/JettonInternalTransferAction.js");
var JettonTransferAction_js_1 = require("../actions/JettonTransferAction.js");
var JettonTransferNotificationAction_js_1 = require("../actions/JettonTransferNotificationAction.js");
var JettonExcessesAction_js_1 = require("../actions/JettonExcessesAction.js");
var TonCatTransactionFetcher = /** @class */ (function (_super) {
    __extends(TonCatTransactionFetcher, _super);
    function TonCatTransactionFetcher(account) {
        var _this = _super.call(this) || this;
        _this.account = account;
        return _this;
    }
    TonCatTransactionFetcher.prototype.parseAction = function (actionFromResponse) {
        var type = actionFromResponse === null || actionFromResponse === void 0 ? void 0 : actionFromResponse.type;
        switch (type) {
            case ActionType_js_1.ActionType.jetton_internal_transfer:
                {
                    var amount = BigInt(actionFromResponse.amount);
                    var source = new UnknownWallet_js_1.UnknownWallet(ton_core_1.Address.parse(actionFromResponse.from));
                    var destination = new UnknownWallet_js_1.UnknownWallet(ton_core_1.Address.parse(actionFromResponse.response_address));
                    return new JettonInternalTransferAction_js_1.JettonInternalTransferAction(amount, source, destination);
                }
            case ActionType_js_1.ActionType.jetton_transfer:
                {
                    var amount = BigInt(actionFromResponse.amount);
                    var destination = null;
                    var response_destination = null;
                    if (actionFromResponse.destination)
                        destination = new UnknownWallet_js_1.UnknownWallet(ton_core_1.Address.parse(actionFromResponse.destination));
                    if (actionFromResponse.response_destination)
                        response_destination = new UnknownWallet_js_1.UnknownWallet(ton_core_1.Address.parse(actionFromResponse.response_destination));
                    return new JettonTransferAction_js_1.JettonTransferAction(amount, destination, response_destination);
                }
            case ActionType_js_1.ActionType.jetton_transfer_notification:
                {
                    var amount = BigInt(actionFromResponse.amount);
                    var sender = null;
                    if (actionFromResponse.sender)
                        sender = new UnknownWallet_js_1.UnknownWallet(ton_core_1.Address.parse(actionFromResponse.sender));
                    return new JettonTransferNotificationAction_js_1.JettonTransferNotificationAction(amount, sender);
                }
            case ActionType_js_1.ActionType.jetton_excesses:
                return new JettonExcessesAction_js_1.JettonExcessesAction();
            default:
                var msg = "Error: Action type: '" + actionFromResponse.type + "' is not implemented!";
                console.error(msg, actionFromResponse);
                throw new Error(msg);
        }
    };
    //было бы отлично это перенести в отдельный объект. Этот объект превращается в GodObject :\
    TonCatTransactionFetcher.prototype.parseAccount = function (type, address) {
        var result = null;
        if (type == WalletType_js_1.WalletType.jetton_wallet)
            result = new JettonWallet_js_1.JettonWallet(ton_core_1.Address.parse(address));
        else if (type == WalletType_js_1.WalletType.wallet)
            result = new Wallet_js_1.Wallet(ton_core_1.Address.parse(address));
        else if (type == null)
            result = null;
        else {
            console.warn("Warning: Account type: '" + type + "' is not implemented! Address: " + address);
            result = new UnknownWallet_js_1.UnknownWallet(ton_core_1.Address.parse(address));
        }
        ;
        return result;
    };
    TonCatTransactionFetcher.prototype.parseMessage = function (messageFromResponse) {
        var source = this.parseAccount(messageFromResponse.source_type, messageFromResponse.source);
        var destination = this.parseAccount(messageFromResponse.destination_type, messageFromResponse.destination);
        var value = BigInt(messageFromResponse.value);
        var actionData = messageFromResponse === null || messageFromResponse === void 0 ? void 0 : messageFromResponse.action;
        var action = null;
        if (actionData)
            action = this.parseAction(actionData);
        return new Message_js_1.Message(source, destination, value, messageFromResponse.op, messageFromResponse.bounced, action, messageFromResponse.comment);
    };
    //говнокод, мне не нравится, но работает
    //UPD: говнокод уменьшился
    TonCatTransactionFetcher.prototype.fetchTransactions = function (limit, offset) {
        if (limit === void 0) { limit = 20; }
        if (offset === void 0) { offset = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var address, response, data, result, _i, data_1, item, time, fee, out_msgs, _a, _b, out_msg, in_msg, transaction;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        address = this.account.address;
                        return [4 /*yield*/, this.get("contracts/address/" + address.toString() + "/transactions", { limit: limit, offset: offset })];
                    case 1:
                        response = _c.sent();
                        data = response.data;
                        result = [];
                        for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                            item = data_1[_i];
                            time = new Date(item.utime * 1000);
                            fee = BigInt(item.fee);
                            out_msgs = new Array;
                            for (_a = 0, _b = item.out_msgs; _a < _b.length; _a++) {
                                out_msg = _b[_a];
                                out_msgs.push(this.parseMessage(out_msg));
                            }
                            in_msg = this.parseMessage(item.in_msg);
                            transaction = new Transaction_js_1.Transaction(this.account, time, fee, item.hash, item.lt, item.compute_exit_code, item.action_result_code, in_msg, out_msgs);
                            result.push(transaction);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return TonCatTransactionFetcher;
}(TonCatClient_js_1.TonCatClient));
exports.TonCatTransactionFetcher = TonCatTransactionFetcher;
