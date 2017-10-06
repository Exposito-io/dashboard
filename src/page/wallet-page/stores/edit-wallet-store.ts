import { autorun, observable, computed, action } from 'mobx'
import { Project, BitcoinWallet, Wallet } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from '../../../stores/store'
import { AlertStore, AlertType } from '../../../stores/alert-store'
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


    @observable walletName: string
    @observable walletDescription: string
    @observable walletLabels: string[] = []

    /*
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
        this.walletName = name
    }

    @action setWalletDescription(description: string) {
        this.walletDescription = description
    }

    @action setWalletLabels(labels: string[]) {
        this.walletLabels = labels
    }    

    @action async save() {
        let wallet = await this.client.wallets.createWallet({
            name: this.walletName,
            labels: this.walletLabels,
            projectId: "59ae0f2e1b7aa4500ae089fe"
        })

        console.log('New wallet: ', wallet)
        
        this.alertStore.alert({
            message: 'Success!',
            type: AlertType.Success
        })
    }

    @action cancel() {
        // TODO
    }

    private client: ExpositoClient
    private alertStore: AlertStore = AlertStore.getStore()

    constructor(walletId?: string) {
        super()
        this.init(walletId)

        //setInterval(() => this.editedWallet.name = 'owef ' + Math.random(), 1000)
        //setInterval(() => this.alertStore.alert({ message: 'testttt', type: AlertType.Success }), 7000)
    }

    private async init(walletId?: string) {
        this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion  })

        if (walletId) {
            let wallet = await this.client.wallets.getWallet({ walletId: walletId })
            this.originalWallet = Object.assign({}, wallet)
            this.editedWallet = wallet
            this.walletName = wallet.name
            this.walletLabels = wallet.labels
        }
        else {
            this.isNewWallet = true
            this.originalWallet = { labels: [] } as BitcoinWallet
            this.editedWallet = new BitcoinWallet({ name: '', labels: [], projectId: null })
        }

        this.isLoading = false
    }

}