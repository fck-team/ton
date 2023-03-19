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
exports.__esModule = true;
exports.JettonWallet = void 0;
var Account_js_1 = require("./Account.js");
var WalletType_js_1 = require("./WalletType.js");
var JettonWallet = /** @class */ (function (_super) {
    __extends(JettonWallet, _super);
    function JettonWallet(address) {
        var _this = _super.call(this, address) || this;
        _this.type = WalletType_js_1.WalletType.jetton_wallet;
        return _this;
    }
    return JettonWallet;
}(Account_js_1.Account));
exports.JettonWallet = JettonWallet;
