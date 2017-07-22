import { autorun, observable, computed } from 'mobx'
import { User } from 'models'
import { ExpositoClient } from 'exposito-client'

export class UserStore {
  
  private static instance: UserStore

  @observable user: User

  private client: ExpositoClient

  static getStore(): UserStore {
      if (!this.instance)
        this.instance = new UserStore()

      return this.instance
  }



  private constructor() {
    //autorun(() => console.log(this.report));
    console.log('wallet store')

    this.client = new ExpositoClient()
    //wallets = await this.client.wallets.getWallets
  }

  /*
  @computed get report() {
    if (this.todos.length === 0)
      return '<none>';
    return `Next todo: "${this.todos[0].task}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }*/




}