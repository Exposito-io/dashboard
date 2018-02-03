import { autorun, observable, computed } from 'mobx'
import { User, UserPreferences, HostingType, NotificationPreferences } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from './store'
import config from '../config'



export class PreferencesStore extends Store {

  @observable preferences: UserPreferences = { selectedProject: {}, notifications: {} } as UserPreferences

  @observable notifications: NotificationPreferences = new NotificationPreferences

  private client: ExpositoClient

  constructor() {
    super()

    this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion })

    this.init()
  }



  private async init() {

    this.preferences = await this.client.users.getPreferences() 


  }

}


export const preferencesStore = new PreferencesStore()
