import { TonClient4 } from "ton";
import { config } from "../config.js";
import { BlockchainNetwork } from "./BlockchainNetwork.js";
import TonWeb from "@fck-foundation/tonweb-ts/dist/types";

export class Blockchain {
    client: TonClient4
    client_tonweb: TonWeb

    constructor(mode: BlockchainNetwork)
    {
        if(mode == BlockchainNetwork.mainnet) 
        {
            const api_key = config.MAINNET_API_KEY;
            this.client = new TonClient4({
                endpoint: 'https://toncenter.com/api/v2/jsonRPC?api_key=' + api_key,
            });
            this.client_tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {
                apiKey: api_key
            }));
        }
        else if(mode == BlockchainNetwork.testnet)
        {
            const api_key = config.TESTNET_API_KEY;
            this.client = new TonClient4({
                endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC?api_key=' + api_key,
            });
            this.client_tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {
                apiKey: api_key
            }));
        }
    }
}