import { Address } from "ton-core";
import { WalletType } from "./WalletType.js";

export abstract class Account {
    public address: Address;
    public type: WalletType;

    protected constructor(address: Address) {
        this.address = address;
    }
}
