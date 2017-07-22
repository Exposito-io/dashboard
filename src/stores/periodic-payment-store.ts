import { autorun, observable, computed } from 'mobx'
import { PeriodicPayment } from 'models'
import { ExpositoClient } from 'exposito-client'

export class PeriodicPaymentStore {
  
  private static instance: PeriodicPaymentStore

  @observable periodicPayments: PeriodicPayment[]
  @observable selectedProject

  private client: ExpositoClient

  static getStore(): PeriodicPaymentStore {
      if (!this.instance)
        this.instance = new PeriodicPaymentStore()

      return this.instance
  }


  private constructor() {
    console.log('wallet store')

    this.client = new ExpositoClient()
  }


}