import TonWeb from "@fck-foundation/tonweb-ts";
import { TonClient, TonClient4 } from "ton";
import { config } from "../config.js";
import { BlockchainNetwork } from "./BlockchainNetwork.js";

export class Blockchain {
  public client: TonClient4;
  public oldClient: TonClient;
  // tslint:disable-next-line:variable-name
  public client_tonweb: TonWeb;

  constructor(mode: BlockchainNetwork) {
    if (mode === BlockchainNetwork.mainnet) {
      // tslint:disable-next-line:variable-name
      const api_key = config.MAINNET_API_KEY;
      this.client = new TonClient4({
        endpoint:
          `${process.env.MAINNET_HOST}/jsonRPC?api_key=` +
          api_key,
      });
      this.oldClient = new TonClient({
        endpoint:
          `${process.env.MAINNET_HOST}/jsonRPC?api_key=` +
          api_key,
      });
      this.client_tonweb = new TonWeb(
        new TonWeb.HttpProvider(
          `${process.env.MAINNET_HOST}/jsonRPC`,
          {
            apiKey: api_key,
          }
        )
      );
    } else if (mode === BlockchainNetwork.testnet) {
      // tslint:disable-next-line:variable-name
      const api_key = config.TESTNET_API_KEY;
      this.client = new TonClient4({
        endpoint:
          `${process.env.TESTNET_HOST}/jsonRPC?api_key=` +
          api_key,
      });
      this.oldClient = new TonClient({
        endpoint:
          `${process.env.TESTNET_HOST}/jsonRPC?api_key=` +
          api_key,
      });
      this.client_tonweb = new TonWeb(
        new TonWeb.HttpProvider(
          `${process.env.TESTNET_HOST}/jsonRPC`,
          {
            apiKey: api_key,
          }
        )
      );
    }
  }
}
