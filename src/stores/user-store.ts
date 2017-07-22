import { autorun, observable, computed } from 'mobx'
import { User } from 'models'
import { ExpositoClient } from 'exposito-client'

export class UserStore {
  
  private static instance: UserStore

  @observable user: User
  @observable selectedProject

  private client: ExpositoClient

  static getStore(): UserStore {
      if (!this.instance)
        this.instance = new UserStore()

      return this.instance
  }



  private constructor() {
    console.log('wallet store')

    this.client = new ExpositoClient()
  }


}