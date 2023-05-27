import TonWeb from "@fck-foundation/tonweb-ts";
import {Address} from "ton-core";
import {Log} from "../../../logs/Log.js";
import {Blockchain} from "../../Blockchain.js";
import {OpCode} from "../../OpCode.js";
import {Account} from "../../wallets/Account.js";
import {UnknownWallet} from "../../wallets/UnknownWallet.js";
import {Action} from "../actions/Action.js";
import {DedustBuyAction} from "../actions/DedustBuyAction.js";
import {DedustLiquidityDepositAction} from "../actions/DedustLiquidityDepositAction.js";
import {DedustLPNotificationAction} from "../actions/DedustLPNotificationAction.js";
import {DedustSellAction} from "../actions/DedustSellAction.js";
import {DedustSwapPoolNotificationAction} from "../actions/DedustSwapPoolNotificationAction.js";
import {JettonTransferAction} from "../actions/JettonTransferAction.js";
import {JettonTransferNotificationAction} from "../actions/JettonTransferNotificationAction.js";
import {Message} from "../Message.js";
import {Transaction} from "../Transaction.js";
import {ITransactionsFetcher} from "./TranscationFetcher.js";

export class TonwebJettonTransactionFetcher implements ITransactionsFetcher {
  public account: Account;
  private blockchain: Blockchain;
  // wtf???
  private supportedOpCodes = [
      OpCode.jetton_transfer_notification,
      OpCode.jetton_transfer,
      OpCode.dedust_buy,
      OpCode.dedust_sell,
      OpCode.dedust_lp_notification,
      OpCode.dedust_swap_pool_notification,
      OpCode.dedust_liquidity_deposit,
  ];
  private ignoredOpCodes: OpCode[] = [];
  constructor(account: Account, blockchain: Blockchain) {
    this.account = account;
    this.blockchain = blockchain;
    for (const [index, opCode] of this.supportedOpCodes.entries()) {
      this.supportedOpCodes[index] = new blockchain.client_tonweb.utils.BN(
        opCode,
      );
    }
  }
  public async fetchTransactions(limit: number): Promise<Transaction[]> {
    const transactions = await this.fetch(limit);
    return this.parse(transactions);
  }
  private isOpSupported(op) {
    for (const opCode of this.supportedOpCodes) {
      if (op.eq(opCode)) {
        return true;
      }
    }
    return false;
  }
  private isOpIgnoring(op) {
    for (const opCode of this.ignoredOpCodes) {
      if (op.toString() === opCode.toString()) {
        return true;
      }
    }
    return false;
  }
  private parseJettonTransferNotificationAction(slice, tonweb) {
    const queryId = slice.loadUint(64);
    const amount = slice.loadCoins();
    const from = slice.loadAddress();
    const maybeRef = slice.loadBit();
    const payload = maybeRef ? slice.loadRef() : slice;
    const payloadOp = payload.loadUint(32);
    if (!payloadOp.eq(new tonweb.utils.BN(0))) {
      // Log.info("no text comment in transfer_notification");
    }
    const payloadBytes = payload.loadBits(slice.getFreeBits());
    const comment = new TextDecoder().decode(payloadBytes);

    const value = BigInt(amount.toString());
    const sender = new UnknownWallet(Address.parse(from.toString()));
    return new JettonTransferNotificationAction(value, sender);
  }
  private parseJettonTransferAction(slice, tonweb) {
    const queryId = slice.loadUint(64);
    const amount = slice.loadCoins();
    const destination = slice.loadAddress();
    const respDestination = slice.loadAddress();
    /* const maybeCustomPayload = slice.loadBit();
        const customPayload = maybeCustomPayload ? slice.loadRef() : slice;*/
    // const forwardTonAmount = slice.loadUint(16);
    const maybePayload = slice.loadBit();
    const payload = maybePayload ? slice.loadRef() : slice;
    const payloadOp = payload.loadUint(32);
    if (!payloadOp.eq(new tonweb.utils.BN(0))) {
      // Log.info("no text comment in transfer");
    }
    const payloadBytes = payload.loadBits(slice.getFreeBits());
    const comment = new TextDecoder().decode(payloadBytes);

    const value = BigInt(amount.toString());
    const dest = new UnknownWallet(Address.parse(destination.toString()));
    const respDest = new UnknownWallet(
      Address.parse(respDestination.toString()),
    );
    return new JettonTransferAction(value, dest, respDest);
  }

  private parseAction(msgBody: Uint8Array, tonweb: TonWeb): Action | undefined {
    const cell = tonweb.boc.Cell.oneFromBoc(msgBody);
    const slice = cell.beginParse();
    const op = slice.loadUint(32);

    if (!this.isOpSupported(op)) {
      if (!this.isOpIgnoring(op)) {
        Log.warn(
            "Op code " +
            op.toString() +
            " not supported! Hex calculator: https://defuse.ca/big-number-calculator.htm",
        );
        this.ignoredOpCodes.push(op);
      }
      return;
    }

    if (op.eq(new tonweb.utils.BN(OpCode.jetton_transfer_notification))) {
      return this.parseJettonTransferNotificationAction(slice, tonweb);
    } else if (op.eq(new tonweb.utils.BN(OpCode.jetton_transfer))) {
      return this.parseJettonTransferAction(slice, tonweb);
    } else if (op.eq(new tonweb.utils.BN(OpCode.dedust_buy))) {
      return this.parseDedustBuyAction();
    } else if (op.eq(new tonweb.utils.BN(OpCode.dedust_sell))) {
      return this.parseDedustSellAction();
    } else if (op.eq(new tonweb.utils.BN(OpCode.dedust_liquidity_deposit))) {
      return this.parseDedustLiquidityDepositAction();
    } else if (op.eq(new tonweb.utils.BN(OpCode.dedust_lp_notification))) {
      return this.parseDedustLPNotificationAction();
    } else if (op.eq(new tonweb.utils.BN(OpCode.dedust_swap_pool_notification))) {
      return this.parseDedustSwapPoolNotificationAction();
    } else {
      Log.error("Called not supported op code " + op.toString());
    }
  }
  private parseDedustSwapPoolNotificationAction() {
    return new DedustSwapPoolNotificationAction();
  }
  private parseDedustLPNotificationAction() {
    return new DedustLPNotificationAction();
  }
  private parseDedustBuyAction() {
    return new DedustBuyAction();
  }
  private parseDedustLiquidityDepositAction() {
    return new DedustLiquidityDepositAction();
  }
  private parseDedustSellAction() {
    return new DedustSellAction();
  }

  private parseMessage(msg, tonweb: TonWeb) {
    const sourceAddress = msg.source;
    const destinationAddress = msg.destination;
    if (
      !msg.msg_data ||
      msg.msg_data["@type"] !== "msg.dataRaw" ||
      !msg.msg_data.body
    ) {
      // no msg or msg body
      Log.info("Message not found!");
      return;
    }

    const source: Account = new UnknownWallet(sourceAddress);
    const destination: Account = new UnknownWallet(destinationAddress);
    const value: bigint = BigInt(msg.value);
    const bounced: boolean = false; // TODO: load bounced https://docs.ton.org/develop/data-formats/msg-tlb

    const msgBody = tonweb.utils.base64ToBytes(msg.msg_data.body);
    const action = this.parseAction(msgBody, tonweb);
    return new Message(source, destination, value, bounced, action);
  }
  private parse(transactions: any) {
    const tonweb = this.blockchain.client_tonweb;
    // tslint:disable-next-line:new-parens
    const result = new Array<Transaction>();
    for (const tx of transactions) {
      // tslint:disable-next-line:radix
      const time = new Date(parseInt(tx.utime) * 1000);
      const fee = tx.fee;
      const hash = tx.transaction_id.hash;
      const lt = tx.transaction_id.lt;
      // tslint:disable-next-line:variable-name
      const in_msg = this.parseMessage(tx.in_msg, tonweb);
      // tslint:disable-next-line:variable-name new-parens
      const out_msgs = new Array<Message>();
      for (const msg of tx.out_msgs) {
        // tslint:disable-next-line:variable-name
        const out_msg = this.parseMessage(msg, tonweb);
        if (out_msg === undefined) {
          Log.warn("Skipping out_msgs of " + hash);
          continue;
        }
        out_msgs.push(out_msg);
      }
      const transaction = new Transaction(
        time,
        fee,
        hash,
        lt,
        in_msg,
        out_msgs,
      );
      result.push(transaction);
    }
    return result;
  }
  private async fetch(limit: number) {
    const tonweb = this.blockchain.client_tonweb;
    return await tonweb.provider.getTransactions(
      this.account.address.toString(),
      limit,
    );
  }
}
