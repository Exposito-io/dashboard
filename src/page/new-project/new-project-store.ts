import { autorun, observable, computed, action } from 'mobx'
import { Project, CreateProjectShareholdersDistributionParams } from 'models'
import { ExpositoClient } from 'exposito-client'
import { Store } from '../../stores/store'
import { SearchResultType } from './search-result-type'
import config from '../../config'

import { PreferencesStore } from '../../stores/preferences-store'

let preferencesStore = PreferencesStore.getStore()


/**
 * Store used by new-project section
 */
export class NewProjectStore extends Store {

    private static instance: NewProjectStore

    @observable projectName: string

    @observable searchResults: any[]

    @observable newProjectParams: CreateProjectShareholdersDistributionParams

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



    @action reset() {
        this.projectName = ""
        this.searchResults = []
        this.newProjectParams = new CreateProjectShareholdersDistributionParams()
    }


    private parseResults(users: any[], repos: any[]) {
        let results = []

        results = results.concat(users.map(user => ({
            type: SearchResultType.ExpositoUser,
            id: user._id,
            name: user.name,
            email: user.email
        })))

        results = results.concat(repos.map(repo => ({
            type: SearchResultType.GithubRepo,
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name
        })))

        return results
    }



    private constructor() {
        super()
        this.init()
    }



    private async init() {
        this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion  })
        this.reset()
        this.isLoading = false
    }

}