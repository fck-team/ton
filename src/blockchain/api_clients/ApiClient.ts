import { AxiosResponse } from "axios";

export interface ApiClient {
    get(endpoint: string, params: Object) : Promise<any>,
    post(endpoint: string, body: Object) : Promise<any>
}