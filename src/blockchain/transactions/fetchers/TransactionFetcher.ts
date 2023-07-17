import TonWeb from "@fck-foundation/tonweb-ts";
import {Cell} from "ton-core";
import {Log} from "../../../logs/Log.js";
import {Blockchain} from "../../Blockchain.js";
import {Account} from "../../wallets/Account.js";
import {UnknownWallet} from "../../wallets/UnknownWallet.js";
import {ActionParser} from "../ActionParser.js";
import {UnknownAction} from "../actions/UnknownAction.js";
import {Message} from "../Message.js";
import {Transaction} from "../Transaction.js";
import {ITransactionsFetcher} from "./ITranscationFetcher.js";

export class TransactionFetcher implements ITransactionsFetcher {
  public account: Account;
  private blockchain: Blockchain;
  private tonweb: TonWeb;
  constructor(account: Account, blockchain: Blockchain) {
    this.account = account;
    this.blockchain = blockchain;
    this.tonweb = blockchain.client_tonweb;
  }
  public async fetchTransactions(limit: number): Promise<Transaction[]> {
    const transactions = await this.fetch(limit);
    const result: Transaction[] = [];
    for (const tx of transactions) {
      try {
        result.push(this.parse(tx));
      } catch (exception) {
        Log.warn("Skipping bad transaction...");
        Log.debug(exception);
        Log.debug(tx);
      }
    }
    return result;
  }

  private parseMessage(msg) {
    const sourceAddress = msg.source;
    const destinationAddress = msg.destination;
    const source: Account = new UnknownWallet(sourceAddress);
    const destination: Account = new UnknownWallet(destinationAddress);
    const value: bigint = BigInt(msg.value);
    const bounced: boolean = false; // TODO: load bounced https://docs.ton.org/develop/data-formats/msg-tlb

    if (!msg.msg_data) {
      return;
    }
    if (
      msg.msg_data["@type"] === "msg.dataText"
    ) {
      return new Message(source, destination, value, bounced, new UnknownAction(0), msg.message);
    }

    const cell = Cell.fromBase64(msg.msg_data.body);
    const slice = cell.beginParse();
    const op = slice.loadUint(32);
    const parser = ActionParser.parse(op, slice.asCell());
    const {action, comment} = parser;
    return new Message(source, destination, value, bounced, action, comment);
  }
  private parseOutMessages(outMsgs: any) {
    const result: Message[] = [];
    for (const msg of outMsgs) {
      const outMsg = this.parseMessage(msg);
      if (outMsg === undefined) {
        continue;
      }
      result.push(outMsg);
    }
    return result;
  }
  private parse(transaction: any) {
    const time = new Date(parseInt(transaction.utime, 10) * 1000);
    const fee = transaction.fee;
    const hash = transaction.transaction_id.hash;
    const lt = transaction.transaction_id.lt;
    // tslint:disable-next-line:variable-name
    const in_msg = this.parseMessage(transaction.in_msg);
    // tslint:disable-next-line:variable-name new-parens
    const out_msgs = this.parseOutMessages(transaction.out_msgs);
    return new Transaction(
        time,
        fee,
        hash,
        lt,
        in_msg,
        out_msgs,
    );
  }
  private async fetch(limit: number) {
    const tonweb = this.blockchain.client_tonweb;
    return await tonweb.provider.getTransactions(
      this.account.address.toString(),
      limit,
    );
  }
}
