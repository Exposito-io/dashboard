import { autorun, observable, computed } from 'mobx'
import { Wallet } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from '../../stores/store'
import config from '../../config'


export class WalletStore extends Store {

    private static instance: WalletStore

    @observable wallets: Wallet[] = []

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

        this.wallets = await this.client.wallets.getWallets()
    }

    /*
    @computed get report() {
      if (this.todos.length === 0)
        return '<none>';
      return `Next todo: "${this.todos[0].task}". ` +
        `Progress: ${this.completedTodosCount}/${this.todos.length}`;
    }*/




}