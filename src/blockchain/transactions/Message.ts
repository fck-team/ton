import { Account } from "../wallets/Account";

export class Message {
    source: Account
    destination: Account
    value: bigint
    op: string
    comment?: string
    bounced: boolean

    /* TODO: 
    action: {
        type: 'jetton:internal_transfer',
        query_id: '0',
        amount: '4332000',
        from: 'EQClQvHmqPaSini7ztSApvlKxfrhq3J3jXA10in6je4w0pN2',
        response_address: 'EQClQvHmqPaSini7ztSApvlKxfrhq3J3jXA10in6je4w0pN2',
        forward_ton_amount: '1'
    },
    */
    //action: Object 
    constructor(source: Account, destination: Account, value: bigint, op: string, bounced: boolean, comment?: string)
    {
        this.source = source;
        this.destination = destination;
        this.value = value;
        this.op = op;
        this.comment = comment;
        this.bounced = bounced;
    }
}