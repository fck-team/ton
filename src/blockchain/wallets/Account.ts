import { Address } from "ton-core";
import { WalletType } from "./WalletType.js";

export abstract class Account {
    address: Address
    type: WalletType

    constructor(address: Address)
    {
        this.address = address;
    }
}