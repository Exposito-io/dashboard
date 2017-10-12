import { autorun, observable, computed, action } from 'mobx'
import { Project, BitcoinWallet, ExpositoWallet, Wallet } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from '../../../stores/store'
import { AlertStore, AlertType } from '../../../stores/alert-store'
import config from '../../../config'
//import * as history from 'history'
import { History } from 'history'


export class EditWalletStore extends Store {
    history: History;

    /**
     * True if the store is creating a new wallet
     */
    @computed get isNewWallet(): boolean {
        return !this.editedWallet.id
    }

    /**
     * Unedited wallet, for cancel purpose
     */
    originalWallet: Wallet


    /*
     * Wallet being edited
     */
    @observable editedWallet: Wallet = { 
        name: '',  
        description: '',
        labels: [],
        projectId: "59ae0f2e1b7aa4500ae089fe"
    } as Wallet


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
        this.editedWallet.description = description
    }

    @action setWalletLabels(labels: string[]) {
        this.editedWallet.labels = labels
    }    

    @action async setWalletId(walletId: string) {
        if (walletId !== this.editedWallet.id)
            this.init(walletId)
    }

    @action async save() {
        let wallet = await this.client.wallets.createWallet(this.editedWallet)
        
        this.alertStore.alert({
            message: 'Wallet successfully created',
            type: AlertType.Success
        })

        this.history.push(`/wallet/${wallet.id}`)
    }

    @action cancel() {
        // TODO
    }

    private client: ExpositoClient
    private alertStore: AlertStore = AlertStore.getStore()

    constructor(walletId: string, history: History) {
        super()
        this.history = history
        this.init(walletId)

        //setInterval(() => this.editedWallet.name = 'owef ' + Math.random(), 1000)
        //setInterval(() => this.alertStore.alert({ message: 'testttt', type: AlertType.Success }), 7000)
    }

    private async init(walletId?: string) {
        this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion  })

        if (walletId) {
            await this.fetchWallet(walletId)
        }
        else {
            this.originalWallet = { labels: [] } as ExpositoWallet
            this.editedWallet = { 
                name: '', 
                description: '', 
                labels: [], 
                projectId: '59ae0f2e1b7aa4500ae089fe' 
            } as Wallet
            
        }

        this.isLoading = false
    }

    private async fetchWallet(walletId: string) {
        let wallet = await this.client.wallets.getWallet({ walletId: walletId })
        this.originalWallet = Object.assign({}, wallet)
        this.editedWallet = wallet
    }

}