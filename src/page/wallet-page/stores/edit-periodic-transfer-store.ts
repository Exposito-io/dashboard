import { autorun, observable, computed, action } from 'mobx'
import { debounce } from 'lodash-decorators'


import { 
    Project, 
    BitcoinWallet, 
    ExpositoWallet, 
    Wallet, 
    PeriodicPayment, 
    DestinationOptions,
    PaymentDestination, 
    UserDestination,
    Money,
    Currencies,
    Currency,
    User
} from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from '../../../stores/store'
import { AlertStore, AlertType } from '../../../stores/alert-store'
import config from '../../../config'
import { MockObserver } from 'rx';


export class EditPeriodicTransferStore extends Store {

    private originalPeriodicTransfer: PeriodicPayment
    private instance: EditPeriodicTransferStore


    @observable selectedRepeatPeriod: RepeatPeriod
    @observable description: string

    @observable searchQuery: string = ''
    @observable searchSuggestions: any[] = []

    @observable weekdays: WeekDay[] = []

    @observable editedPeriodicTransfer: PeriodicPayment = {
        amount: '0',
        currency: 'USD',
        isAmountPct: false,
        projectId: '',
        destination: '',
        description: '',
        schedule: ''
    } as PeriodicPayment

    @computed get calculatedAmount() { 
        if (this.editedPeriodicTransfer.isAmountPct)
            return Money.fromStringDecimal('0', 'USD') // TODO: Calculate amount
        else
            return Money.fromStringDecimal(this.editedPeriodicTransfer.amount, this.editedPeriodicTransfer.currency)
    }

    @computed get approximativeAmount() { return this.editedPeriodicTransfer.isAmountPct }


    @computed get amountPrefix() { 
        if (!this.editedPeriodicTransfer.isAmountPct && Money.isValidCurrency(this.editedPeriodicTransfer.currency))
            return Money.getCurrencyObject(this.editedPeriodicTransfer.currency).symbol_native + ' '
        else
            return ''
    }

    @computed get amountSuffix() {
        if (this.editedPeriodicTransfer.isAmountPct)
            return ' %'
        else
            return ''
    }


    @action addRecipient(recipient: any) {
        let destination = convertSearchResultToDestination(recipient)

        this.editedPeriodicTransfer.destination = destination.destination
        this.editedPeriodicTransfer.destinationType = destination.destinationType

    }

    @action setAmountType(currencyOrPct: string) {
        if (currencyOrPct === 'PCT') 
            this.editedPeriodicTransfer.isAmountPct = true
        else 
            this.editedPeriodicTransfer.isAmountPct = false
        
        this.editedPeriodicTransfer.currency = currencyOrPct 
    }

    @debounce(500)
    @action 
    async fetchSearchSuggestions() {
        if (this.searchQuery && this.searchQuery.length > 1) {
            let suggestions = await this.client.search(this.searchQuery)
            
            if (suggestions instanceof Array)
                this.searchSuggestions = suggestions
        }
    }

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



function convertSearchResultToDestination(searchResult: any): DestinationOptions {
    if (User.runtimeType().is(searchResult)) 
        return convertUserToDestination(searchResult)
    else {
        throw('')
    }   
}


function convertUserToDestination(user): DestinationOptions {
    return {
        destination: {
            userId: user.id,
            destination: user.defaultWallet.address,
            user: user
        },
        destinationType: 1 // TODO: Remove hardcoded destinationType
    }
}
