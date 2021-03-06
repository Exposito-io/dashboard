import { autorun, observable, computed, action } from 'mobx'
import { Project, BitcoinWallet, ExpositoWallet, Wallet, PeriodicPayment } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from '../../../stores/store'
import { AlertStore, AlertType } from '../../../stores/alert-store'
import config from '../../../config'


export class PeriodicTransfersStore extends Store {

    @observable periodicPayments: PeriodicPayment[] = []
    @observable selectedPeriodicTransfer: PeriodicPayment

    @action addPeriodicTransfer(periodicTransfer: PeriodicPayment) {
        this.periodicPayments.push(periodicTransfer)
        this.unselectPeriodicTransfer()
        this.selectPeriodicTransfer(periodicTransfer)
    }

    @action selectPeriodicTransfer(periodicTransfer: PeriodicPayment) {
        this.selectedPeriodicTransfer = periodicTransfer
    }

    @action unselectPeriodicTransfer() {
        this.selectedPeriodicTransfer = undefined
    }

    @action async save() {
        //this.unselectPeriodicTransfer()
    }

    @action cancel() {
        this.unselectPeriodicTransfer()
    }

    private client: ExpositoClient

    constructor(walletId: string) {
        super()
        this.init(walletId)
        ;(window as any).store = this
    }

    private async init(walletId: string) {
        this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion  })

        this.periodicPayments = await this.client.periodicPayments.getPeriodicPaymentsForWallet(walletId)
        this.isLoading = false
    }


}



