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

    @computed get isModified(): boolean {
        if (this.isNewWallet)
            return true
        else if (!this.originalWallet)
            return false // Data not loaded yet
        else {
            return this.originalWallet.name !== this.editedWallet.name
                || this.originalWallet.labels.length !== this.editedWallet.labels.length
                || !this.originalWallet.labels.every(label => this.editedWallet.labels.includes(label))
        }
    }


    @action setWalletName(name: string) {
        this.editedWallet.name = name
    }

    @action setWalletDescription(description: string) {
        this.editedWallet.name = description
    }

    @action setWalletLables(labels: string[]) {
        this.editedWallet.labels = labels
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
            this.originalWallet = { labels: [] } as BitcoinWallet
            this.editedWallet = new BitcoinWallet({ name: '', labels: [], projectId: null })
        }

        this.isLoading = false
    }

}