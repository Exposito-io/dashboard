import { autorun, observable, computed } from 'mobx'
import { 
    Wallet,
    BitcoinWallet,
    Transaction,
    PaymentDestination
} from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from '../../stores/store'
import config from '../../config'


export class WalletStore extends Store {

    private static instance: WalletStore

    @observable wallets: { wallet: Wallet, transactions: Transaction[] }[] = []

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
                                        .map(w => ({ wallet: w, transactions: [] }))

        for (let walletData of wallets) {
            walletData.transactions = await this.client.transactions.getTransactionsForWallet(walletData.wallet.id)
        }

        wallets = [{ wallet: wallet as Wallet, transactions: transactions }]
                    .concat(wallets)

        this.wallets = wallets

        console.log('wallets: ', this.wallets)

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


let wallet = new BitcoinWallet({
    coreWallet: {},
    labels: [],
    name: 'Main Wallet',
    projectId: 'gge'
})

wallet.amount = '430'
wallet.currency = 'BTC'

let t1 = new Transaction()

let transactions: Transaction[] = [
    {
        creationDate: new Date('2017-02-04'),
        endDate: new Date('2017-02-04'),
        currency: 'BTC',
        note: 'Transfer from personnal account',
        amount: '0.53123',
        sourceType: PaymentDestination.BITCOIN_ADDRESS,
        sourceWalletId: 'afew',
        destination: 'awf',
        destinationType: PaymentDestination.EXPOSITO_WALLET,
        status: 1
    },
    {
        creationDate: new Date('2017-02-21'),
        endDate: new Date('2017-02-21'),
        currency: 'BTC',
        note: 'Design of the intro page',
        amount: '-0.145',
        sourceType: PaymentDestination.BITCOIN_ADDRESS,
        sourceWalletId: 'afew',
        destination: 'awf',
        destinationType: PaymentDestination.EXPOSITO_WALLET,
        status: 1
    }, /* 
  {
    creationDate: new Date('2017-03-14'),
    endDate: new Date('2017-03-14'),
    currency: 'ETH',
    note: 'Donation',
    amount: '0.318',
    sourceType: PaymentDestination.ETHEREUM_ADDRESS,
    sourceWalletId: 'afew',
    destination: 'awf',
    destinationType: PaymentDestination.EXPOSITO_WALLET,
    status: 1
  }, */
    {
        creationDate: new Date('2017-04-03'),
        endDate: new Date('2017-04-03'),
        currency: 'BTC',
        note: 'Mathew\'s deposit',
        amount: '0.293',
        sourceType: PaymentDestination.BITCOIN_ADDRESS,
        sourceWalletId: 'afew',
        destination: 'awf',
        destinationType: PaymentDestination.EXPOSITO_WALLET,
        status: 1
    }
]