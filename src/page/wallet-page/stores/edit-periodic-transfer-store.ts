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
    User,
    WalletType
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

    @observable destination: User | Project

    
    @observable sourceWalletId: string
    @observable sourceWallet: Wallet = {
        amount: '',
        currency: '',
        description: '',
        name: '',
        projectId: '',
        id: '',
        labels: [],
        type: WalletType.EXPOSITO,
    } as Wallet


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
        /*
        let destination = convertSearchResultToDestination(recipient)

        this.editedPeriodicTransfer.destination = destination.destination
        this.editedPeriodicTransfer.destinationType = destination.destinationType
        */
        this.destination = recipient

        if (Project.runtimeType().is(recipient)) 
            (recipient as any).lastTokenholdersSnapshot = sampleSnapshot

    }

    @action createPeriodicTransfer() {
        
        const periodicTransfer = {
            amount: '0',
            currency: 'USD',
            isAmountPct: false,
            sourceWalletId: this.sourceWalletId,
            destination: '',
            description: '',
            schedule: ''
        } as PeriodicPayment

        this.originalPeriodicTransfer = Object.assign({}, periodicTransfer)
        this.editedPeriodicTransfer = periodicTransfer

        return this.editedPeriodicTransfer
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

        if (periodicTransfer) {
            this.editedPeriodicTransfer = Object.assign({}, periodicTransfer)
            this.originalPeriodicTransfer = periodicTransfer
        }

    }

    private client: ExpositoClient



    constructor(sourceWalletId?: string) {
        super()
        
        this.init(sourceWalletId)
        ;(window as any).editStore1 = this
    }

    private async init(sourceWalletId?: string) {
        this.isLoading = true

        this.sourceWalletId = sourceWalletId
        this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion  })

        if (sourceWalletId) 
            this.sourceWallet = await this.client.wallets.getWallet({ walletId: sourceWalletId })
        
        this.setPeriodicTransfer()

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
    else if (Project.runtimeType().is(searchResult)) 
        return convertProjectToDestination(searchResult)
    else
        throw('')
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

function convertProjectToDestination(project): DestinationOptions {
    return {
        destination: {
            id: '',
            projectId: project.id,
            lastSnapshot: sampleSnapshot,
            tokenholders: []
        }
    }
}

let sampleSnapshot = {
    id: "83",
    projectId: "5a469f55b8dc496167b7a057", 
    date: new Date(), 
    tokenholders: [
        /*
        { 
            "userId" : "591279a23b14d93bdbed8a61", 
            "shares" : "2000000" 
        }, */
        { 
            "email": "nathan.schmidt987@gmail.com", 
            "name": "Julia Allison", 
            "picture": "https://avatars0.githubusercontent.com/u/26845852?v=4", 
            walletAddresses: [],
            "shares": "5200000" 
        },    
        { 
            "email": "mathew.corm@gmail.com", 
            "name": "Mathew Cormier", 
            "picture": "https://avatars3.githubusercontent.com/u/642515?v=4", 
            walletAddresses: [],
            "shares": "2273000" 
        },             
        { 
            "userId" : "59bd5e63a258fa9e23f6c51c", 
            "name" : "Robert B. Youngs", 
            "email" : "robert@gmail.com", 
            "picture" : "http://www.drtoddcase.com/images/istock-images/istock_000018535175xsmall.jpg",
            walletAddresses: [],
            "shares" : "1500000"
        },
        { 
            "email": "mathew@exposito.io", 
            "name": "Tommy Simons", 
            "picture": "https://avatars2.githubusercontent.com/u/31804070?v=4", 
            walletAddresses: [],
            "shares": "1027000" 
        }
    ]
}