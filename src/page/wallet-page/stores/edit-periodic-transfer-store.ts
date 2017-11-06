import { autorun, observable, computed, action } from 'mobx'
import { Project, BitcoinWallet, ExpositoWallet, Wallet, PeriodicPayment } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from '../../../stores/store'
import { AlertStore, AlertType } from '../../../stores/alert-store'
import config from '../../../config'


export class EditPeriodicTransferStore extends Store {

    private originalPeriodicTransfer: PeriodicPayment
    private instance: EditPeriodicTransferStore


    @observable selectedRepeatPeriod: RepeatPeriod

    @observable editedPeriodicTransfer: PeriodicPayment



    @action async save() {
        // TODO
    }

    @action cancel() {
        // TODO
    }

    @action async setPeriodicTransfer() {
        
    }

    private client: ExpositoClient



    constructor(periodicTransferId?: string) {
        super()
        this.init(periodicTransferId)
    }

    private async init(periodicTransferId?: string) {
        this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion  })

        let periodicTransfer = await this.client.periodicPayments.getPeriodicPayment(periodicTransferId)
        
        this.editedPeriodicTransfer = Object.assign({}, periodicTransfer)
        this.originalPeriodicTransfer = periodicTransfer

        this.isLoading = false
    }


}


export enum RepeatPeriod {
    Hourly = 'Hourly',
    Daily = 'Daily',
    Weekly = 'Weekly',
    Monthly = 'Monthly',
    Yearly = 'Yearly'
}