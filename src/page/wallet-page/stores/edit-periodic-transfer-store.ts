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

    @observable weekdays: WeekDay[] = []

    @observable editedPeriodicTransfer: PeriodicPayment = {
        amount: '',
        projectId: '',
        destination: '',
        description: '',
        schedule: ''
    } as PeriodicPayment

    @action toggleWeekday(day: WeekDay) {
        if (this.weekdays.includes(day))
            this.weekdays.splice(this.weekdays.indexOf(day), 1)
        else
            this.weekdays.push(day)
    }

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

export enum WeekDay {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
