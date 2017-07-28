import { autorun, observable, computed } from 'mobx'
import { User, UserPreferences, HostingType } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from './store'



export class PreferencesStore extends Store {
  
  private static instance: PreferencesStore

  @observable preferences: UserPreferences = { selectedProject: {} } as UserPreferences

  private client: ExpositoClient


  static getStore(): PreferencesStore {

      if (!this.instance)
        this.instance = new PreferencesStore()

      return this.instance
  }




  private constructor() {
    super()

    this.client = new ExpositoClient()

    setTimeout(() => {
      let pref = new UserPreferences()
      pref.selectedProject = {
        id: '597637b500992d7e78edd894',
        name: "Project 2",
        description: "fawef",
        githubProjects: [],
        hosting: HostingType.GoogleCloud,
        members: []
      }

      this.preferences = pref
    }, 100)
  }


}