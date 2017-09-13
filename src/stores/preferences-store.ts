import { autorun, observable, computed } from 'mobx'
import { User, UserPreferences, HostingType, NotificationPreferences } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from './store'



export class PreferencesStore extends Store {

  private static instance: PreferencesStore

  @observable preferences: UserPreferences = { selectedProject: {}, notifications: {} } as UserPreferences

  @observable notifications: NotificationPreferences = new NotificationPreferences

  private client: ExpositoClient


  static getStore(): PreferencesStore {

    if (!this.instance)
      this.instance = new PreferencesStore()

    return this.instance
  }




  private constructor() {
    super()

    this.client = new ExpositoClient()

    //setTimeout(() => {
    let pref = new UserPreferences()
    pref.selectedProject = {
      id: '597637b500992d7e78edd894',
      name: "Project 2",
      description: "fawef",
      githubProjects: [],
      hosting: HostingType.GoogleCloud,
      members: []
    }
    
    pref.notifications = {
      n1: false,
      n2: true,
      n3: true,
      n4: false,
      n5: true,
      n6: false,
      n7: false
    }

    this.preferences = pref
    this.notifications = pref.notifications

    //}, 100)
  }


}