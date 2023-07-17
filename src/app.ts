/*import {Address} from "ton-core";
import {Blockchain} from "./blockchain/Blockchain.js";
import {BlockchainNetwork} from "./blockchain/BlockchainNetwork.js";
import {TonwebJettonTransactionFetcher} from "./blockchain/transactions/fetchers/TonwebJettonTransactionFetcher.js";
import {TransactionFetcher} from "./blockchain/transactions/fetchers/TransactionFetcher.js";
import { UnknownWallet } from "./blockchain/wallets/UnknownWallet.js";*/

export { JettonWallet } from "./blockchain/wallets/JettonWallet.js";
export { Wallet } from "./blockchain/wallets/Wallet.js";
export { UnknownWallet } from "./blockchain/wallets/UnknownWallet.js";
export { WalletType } from "./blockchain/wallets/WalletType.js";
export { TonCatTransactionFetcher } from "./blockchain/transactions/fetchers/TonCatTransactionFetcher.js";
export { TonwebJettonTransactionFetcher } from "./blockchain/transactions/fetchers/TonwebJettonTransactionFetcher.js";
export { TransactionFetcher } from "./blockchain/transactions/fetchers/TransactionFetcher.js";
export { Blockchain } from "./blockchain/Blockchain.js";
export { BlockchainNetwork } from "./blockchain/BlockchainNetwork.js";
// tslint:disable-next-line:max-line-length
export { JettonTransferNotificationAction } from "./blockchain/transactions/actions/JettonTransferNotificationAction.js";
export { JettonTransferAction } from "./blockchain/transactions/actions/JettonTransferAction.js";
export { JettonExcessesAction } from "./blockchain/transactions/actions/JettonExcessesAction.js";
export { JettonInternalTransferAction } from "./blockchain/transactions/actions/JettonInternalTransferAction.js";
export { DedustBuyAction } from "./blockchain/transactions/actions/DedustBuyAction.js";
export { DedustSellAction } from "./blockchain/transactions/actions/DedustSellAction.js";
export { DedustLPNotificationAction } from "./blockchain/transactions/actions/DedustLPNotificationAction.js";
// tslint:disable-next-line:max-line-length
export { DedustSwapPoolNotificationAction } from "./blockchain/transactions/actions/DedustSwapPoolNotificationAction.js";
export { DedustLiquidityDepositAction } from "./blockchain/transactions/actions/DedustLiquidityDepositAction.js";
export { DedustJettonLiquidityDepositAction } from "./blockchain/transactions/actions/DedustJettonLiquidityDepositAction.js";
export { UnknownAction } from "./blockchain/transactions/actions/UnknownAction.js";
export { Transaction } from "./blockchain/transactions/Transaction.js";
export { api } from "./libs/index.js";

// TESTS
/*
const blockchain = new Blockchain(BlockchainNetwork.mainnet);
const fetcher = new TransactionFetcher(
    new UnknownWallet(Address.parse("EQBjTg5KAKakMQ_BT_DVkUWMGhhiqW0ADppVOLnF3m7sNv5P")),
    blockchain
);
setInterval(() => fetcher.fetchTransactions(30).then((transactions) => {
    console.log(transactions);
}), 1000);
*/
