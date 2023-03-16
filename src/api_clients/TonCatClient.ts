import axios from "axios";
import { ApiClient } from "./ApiClient.js";

export class TonCatClient implements ApiClient {
    private host: string;

    constructor() {
        this.host = "https://api.ton.cat/v2/";
    }

    post(endpoint: string, body?: Object) {
        return axios.post(this.host + endpoint, body);
    }

    get(endpoint: string, params?: Object) {
        return axios.get(this.host + endpoint, {params: params});
    }
}