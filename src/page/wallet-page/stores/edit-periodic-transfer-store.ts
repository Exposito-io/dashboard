import { autorun, observable, computed, action } from 'mobx'


import { Project, BitcoinWallet, ExpositoWallet, Wallet, PeriodicPayment, PaymentDestination, Money } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from '../../../stores/store'
import { AlertStore, AlertType } from '../../../stores/alert-store'
import config from '../../../config'


export class EditPeriodicTransferStore extends Store {

    private originalPeriodicTransfer: PeriodicPayment
    private instance: EditPeriodicTransferStore


    @observable selectedRepeatPeriod: RepeatPeriod
    @observable description: string

    @observable editedPeriodicTransfer: PeriodicPayment = {
        amount: '',
        projectId: '',
        destination: '',
        description: '',
        schedule: ''
    } as PeriodicPayment


    @action async save() {
        // TODO
    }

    @action cancel() {
        // TODO
    }

    @action async setPeriodicTransfer(periodicTransfer?: PeriodicPayment) {
        this.isLoading = true

        if (periodicTransfer) {
            this.editedPeriodicTransfer = Object.assign({}, periodicTransfer)
            this.originalPeriodicTransfer = periodicTransfer
        }

        this.isLoading = false
    }

    private client: ExpositoClient



    constructor(periodicTransfer?: PeriodicPayment) {
        super()
        this.init(periodicTransfer)
        ;(window as any).editStore = this
    }

    private async init(periodicTransfer?: PeriodicPayment) {
        this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion  })

        this.setPeriodicTransfer(periodicTransfer)
    }


}


export enum RepeatPeriod {
    Hourly = 'Hourly',
    Daily = 'Daily',
    Weekly = 'Weekly',
    Monthly = 'Monthly',
    Yearly = 'Yearly'
}