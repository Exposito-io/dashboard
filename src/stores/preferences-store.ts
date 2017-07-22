import { autorun, observable, computed } from 'mobx'
import { User } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from './store'

export class PreferencesStore extends Store {
  
  private static instance: PreferencesStore

  @observable preferences: User

  private client: ExpositoClient


  static getStore(): PreferencesStore {

      if (!this.instance)
        this.instance = new PreferencesStore()

      return this.instance
  }



  private constructor() {
    super()

    console.log('wallet store')

    this.client = new ExpositoClient()
  }


}