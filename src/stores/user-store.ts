import { autorun, observable, computed } from 'mobx'
import { User } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from './store'
import config from '../config'

export class UserStore extends Store {
  
  private static instance: UserStore

  @observable user: User

  private client: ExpositoClient


  static getStore(): UserStore {

      if (!this.instance)
        this.instance = new UserStore()

      return this.instance
  }



  private constructor() {
    super()

    console.log('wallet store')

    this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion })
  }


}