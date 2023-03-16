import { Address } from "ton-core";
import { Account } from "./Account.js";
import { WalletType } from "./WalletType.js";

export class JettonWallet extends Account {

    constructor(address: Address)
    {
        super(address);
        this.type = WalletType.jetton_wallet;
    }
}