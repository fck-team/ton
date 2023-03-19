"use strict";
exports.__esModule = true;
exports.TonCatClient = void 0;
var axios_1 = require("axios");
var TonCatClient = /** @class */ (function () {
    function TonCatClient() {
        this.host = "https://api.ton.cat/v2/";
    }
    TonCatClient.prototype.post = function (endpoint, body) {
        return axios_1["default"].post(this.host + endpoint, body);
    };
    TonCatClient.prototype.get = function (endpoint, params) {
        return axios_1["default"].get(this.host + endpoint, { params: params });
    };
    return TonCatClient;
}());
exports.TonCatClient = TonCatClient;
