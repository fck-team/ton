import { Address } from "ton-core";

export class JettonMetadata {
    private _address: Address;
    private _decimals: number;
    private _symbol: string;
    private _name: string;
    private _image: string;
    private _description: string | null;

    constructor(address: Address, decimals: number, symbol: string, name: string, image: string, description: string | null) {
        this._address = address;
        this._decimals = decimals;
        this._symbol = symbol;
        this._name = name;
        this._image = image;
        this._description = description;
    }

    public get decimals() {
        return this._decimals;
    }

    public get address() {
        return this._address;
    }

    public get symbol() {
        return this._symbol;
    }

    public get name() {
        return this._name;
    }

    public get image() {
        return this._image;
    }

    public get description() {
        return this._description;
    }
}