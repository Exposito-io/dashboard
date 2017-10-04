import { autorun, observable, computed, action } from 'mobx'
import { Project, BitcoinWallet, Wallet } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from '../../../stores/store'
import config from '../../../config'


export class EditWalletStore extends Store {

    /** 
     * True if the store is creating a new wallet
     */
    @observable isNewWallet: boolean

    /**
     * Unedited wallet, for cancel purpose
     */
    originalWallet: Wallet

    /**
     * Wallet being edited
     */
    @observable editedWallet: Wallet


    @computed get pageTitle(): string {
        if (this.isNewWallet)
            return 'New Wallet'
        else {
            if (this.originalWallet)
                return this.originalWallet.name
            else 
                return ''
        }
    }


    @action save() {
        // TODO
    }

    @action cancel() {
        // TODO
    }

    private client: ExpositoClient

    constructor(walletId?: string) {
        super()
        this.init(walletId)
    }

    private async init(walletId?: string) {
        this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion  })

        if (walletId) {
            let wallet = await this.client.wallets.getWallet({ walletId: walletId })
            this.originalWallet = Object.assign({}, wallet)
            this.editedWallet = wallet
        }
        else {
            this.isNewWallet = true
        }

        this.isLoading = false
    }

}