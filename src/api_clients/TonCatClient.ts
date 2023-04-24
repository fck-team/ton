import { api } from "../libs/index.js";
import { ApiClient } from "./ApiClient.js";

export class TonCatClient implements ApiClient {
  private host: string;

  constructor() {
    this.host = "https://api.ton.cat/v2/";
  }

  post(endpoint: string, body?: Object) {
    return api.post(this.host + endpoint, body);
  }

  get(endpoint: string, params?: Object) {
    return api.get(this.host + endpoint, { params: params });
  }
}
