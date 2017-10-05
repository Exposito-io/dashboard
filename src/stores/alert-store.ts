import * as _ from 'lodash'
import { autorun, observable, computed, action } from 'mobx'
import { Project } from 'models'
import { Store } from './store'
import config from '../config'



export enum AlertType {
    Info = 'info',
    Success = 'success',
    Warning = 'warning',
    Error = 'error'
}

export class Alert {
    type: AlertType
    message: string = ''
    delay?: number = 5000
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
    }

    private async init() {
        this.isLoading = false
    }

}