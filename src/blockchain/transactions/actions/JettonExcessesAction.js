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
exports.JettonExcessesAction = void 0;
var ActionType_js_1 = require("./ActionType.js");
var Action_js_1 = require("./Action.js");
var JettonExcessesAction = /** @class */ (function (_super) {
    __extends(JettonExcessesAction, _super);
    function JettonExcessesAction() {
        return _super.call(this, ActionType_js_1.ActionType.jetton_excesses) || this;
    }
    return JettonExcessesAction;
}(Action_js_1.Action));
exports.JettonExcessesAction = JettonExcessesAction;
