import { autorun, observable, computed, action } from 'mobx'
import { Project, BitcoinWallet, ExpositoWallet, Wallet, PeriodicPayment } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from '../../../stores/store'
import { AlertStore, AlertType } from '../../../stores/alert-store'
import config from '../../../config'


export class PeriodicTransfersStore extends Store {

    @observable periodicPayments: PeriodicPayment[] = []
    @observable selectedPeriodicTransfer: PeriodicPayment

    @action selectPeriodicTransfer(periodicTransfer: PeriodicPayment) {
        this.selectedPeriodicTransfer = periodicTransfer
    }

    @action async save() {
        // TODO
    }

    @action cancel() {
        // TODO
    }

    private client: ExpositoClient

    constructor(walletId: string) {
        super()
        this.init(walletId)
    }

    private async init(walletId: string) {
        this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion  })

        this.periodicPayments = await this.client.periodicPayments.getPeriodicPaymentsForWallet(walletId)
        this.isLoading = false
    }


}