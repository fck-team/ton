import { TonClient4 } from "ton";
import { config } from "../config.js";
import { BlockchainNetwork } from "./BlockchainNetwork.js";

export class Blockchain {
    client: TonClient4

    constructor(mode: BlockchainNetwork)
    {
        if(mode == BlockchainNetwork.mainnet) 
        {
            const api_key = config.MAINNET_API_KEY;
            this.client = new TonClient4({
                endpoint: 'https://toncenter.com/api/v2/jsonRPC?api_key=' + api_key,
            });
        }
        else if(mode == BlockchainNetwork.testnet)
        {
            const api_key = config.TESTNET_API_KEY;
            this.client = new TonClient4({
                endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC?api_key=' + api_key,
            });
        }
    }
}