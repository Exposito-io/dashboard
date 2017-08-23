import { autorun, observable, computed, action } from 'mobx'
import { Project } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from './store'
import config from '../config'
import { PreferencesStore } from './preferences-store'

let preferencesStore = PreferencesStore.getStore()


/**
 * Store used by new-project section
 */
export class NewProjectStore extends Store {

    private static instance: NewProjectStore

    @observable projectName: string = ""

    @observable searchResults: any[] = []

    private client: ExpositoClient


    static getStore(): NewProjectStore {

        if (!this.instance)
            this.instance = new NewProjectStore()

        return this.instance
    }



    /**
     * Search for Github repos and Exposito users
     * @param query 
     */
    @action async search(query: string) {
        let results = await Promise.all([this.client.users.find(query), this.client.github.findRepos(query)])
        
        this.searchResults = this.parseResults(results[0], results[1])
    }



    private parseResults(users: any[], repos: any[]) {
        let results = []

        results.push(users)
        results.push(repos)

        return results
    }

    private constructor() {
        super()
        this.init()

        /*
        setTimeout(async () => {
            var results = await this.client.github.findRepos('mathew')
            console.log(results)
        },6000)*/
    }



    private async init() {
        this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion  })
        this.isLoading = false
    }

}