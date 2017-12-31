import * as _ from 'lodash'
import { autorun, observable, computed, action } from 'mobx'
import { Project } from 'models'
import { Store } from './store'
import config from '../config'


const DEFAULT_DELAY = 5000


export enum AlertType {
    Info = 'info',
    Success = 'success',
    Warning = 'warning',
    Error = 'error'
}

export class Alert {
    type: AlertType
    message: string = ''
    delay?: number = DEFAULT_DELAY
}


/**
 * Store responsible for dispatching the user alerts,
 * which are temporary notifications for the user.
 *
 */
export class AlertStore extends Store {

    private static instance: AlertStore


    @observable.shallow alerts: Alert[] = []


    static getStore(): AlertStore {

        if (!this.instance)
            this.instance = new AlertStore()

        return this.instance
    }

    /** Show a success message to the user */
    public success(message: string, delay: number = DEFAULT_DELAY) {
        this.alert({
            message,
            type: AlertType.Success,
            delay
        })
    }

    /** Show a message to the user */
    public alert(alert: Alert): void {
        alert = Object.assign(new Alert(), alert)
        this.alerts.push(alert)
        
        setTimeout(() => 
            (this.alerts as any).remove(alert)
        , Math.max(0, alert.delay))
    }



    private constructor() {
        super()
        this.init()
        ;(window as any).alertStore = this
    }

    private async init() {
        this.isLoading = false
    }

}