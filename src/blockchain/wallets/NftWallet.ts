import { Address } from "ton-core";
import { Account } from "./Account.js";
import { WalletType } from "./WalletType.js";

export class NftWallet extends Account {

    constructor(address: Address)
    {
        super(address);
        this.type = WalletType.nft_item;
    }
}