import { autorun, observable, computed, extendObservable } from 'mobx'
import { 
    Wallet,
    BitcoinWallet,
    Transaction,
    PaymentDestination
} from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from '../../stores/store'
import config from '../../config'
import { Observable } from 'rx';


class WalletData {
    wallet: Wallet
    transactions: Transaction[] = []
    periodicTransferCount? = 0
}


export class WalletStore extends Store {

    private static instance: WalletStore

    @observable wallets: WalletData[] = []

    private client: ExpositoClient

    static getStore(): WalletStore {
        if (!this.instance)
            this.instance = new WalletStore()

        return this.instance
    }



    private constructor() {
        super()

        this.init()

    }


    private async init() {
        this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion })

        

        let wallets = (await this.client.wallets.getWallets())
                                        .map(w => ({ wallet: w, transactions: [], periodicTransferCount: 0 }) as WalletData)

        for (let walletData of wallets) {
            walletData.transactions = await this.client.transactions.getTransactionsForWallet(walletData.wallet.id)
            walletData.periodicTransferCount = (await this.client.periodicPayments.getPeriodicPaymentsForWallet(walletData.wallet.id)).length
        }

        this.wallets = wallets

        this.isLoading = false
    }

    /*
    @computed get report() {
      if (this.todos.length === 0)
        return '<none>';
      return `Next todo: "${this.todos[0].task}". ` +
        `Progress: ${this.completedTodosCount}/${this.todos.length}`;
    }*/




}

