import { autorun, observable, computed, action } from 'mobx'
import { Project, CreateProjectShareholdersDistributionParams, 
         ShareholderDescription, InvitedShareholderDescription, 
         GithubShareholdersDescription } from 'models'
import { ShareholderDescriptionView, GithubShareholdersDescriptionView } from './shareholders'
import { debounce } from 'lodash-decorators'
import { ExpositoClient } from 'exposito-client'
import { Store } from '../../stores/store'
import { SearchResultType } from './search-result-type'
import { getGithubRepoFromFullName, isQueueJob } from '../../lib/tools'
import config from '../../config'
import * as BigNumber from 'bignumber.js'

import { PreferencesStore } from '../../stores/preferences-store'

let preferencesStore = PreferencesStore.getStore()


/**
 * Store used by new-project section
 */
export class NewProjectStore extends Store {

    private static instance: NewProjectStore

    @observable projectName: string

    @observable searchQuery: string
    @observable searchResults: any[] = []
    @computed get hasSearchResults() { return this.searchResults.length > 0 }
    @observable searchHasFocus: boolean

    @observable newProjectParams: CreateProjectShareholdersDistributionParams
    @observable shareholders: (ShareholderDescriptionView | GithubShareholdersDescriptionView)[]
    @computed get hasShareholders() { return this.shareholders.length > 0 }

    @observable totalTokenCount: string
    

    private client: ExpositoClient


    static getStore(): NewProjectStore {

        if (!this.instance)
            this.instance = new NewProjectStore()

        return this.instance
    }



    @action 
    //@debounce(500)
    changeSearchQuery(query: string) {
        this.searchQuery = query
    }


    @action async addShareholder(searchResult) {
        let tokens = this.calculateAssignableTokens()

        switch (searchResult.type) {
            case SearchResultType.ExpositoUser:
                let user = await this.client.users.getById(searchResult.id)

                this.shareholders.push({
                    userId: searchResult.id,
                    name: searchResult.name,
                    image: searchResult.image,
                    email: user.email,
                    shares: tokens,
                    isWaitingForData: false
                })
                break

            case SearchResultType.GithubRepo:

                let repo = await this.client.github.getRepoStats(getGithubRepoFromFullName(searchResult.fullName))

                // Repo stats are beeing calculated
                if (isQueueJob(repo)) {
                    this.shareholders.push({
                        githubProject: searchResult.fullName,
                        description: '',
                        shares: tokens,
                        isWaitingForRepoStats: true
                    })
                }
                // Repo stats are already in server cache
                else {
                    this.shareholders.push({
                        githubProject: searchResult.fullName,
                        description: '',
                        shares: tokens,
                        isWaitingForRepoStats: false,
                        stats: repo
                    })                    
                }
                break
            
            default: break
        }

        this.searchResults = []
    }


    @action removeShareholder(shareholder: ShareholderDescriptionView | GithubShareholdersDescriptionView) {
        let index = this.shareholders.indexOf(shareholder)
        this.shareholders.splice(index, 1)
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
        this.shareholders = []
        this.totalTokenCount = '100000000'
    }


    private parseResults(users: any[], repos: any[]) {
        let results = []

        results = results.concat(users.map(user => ({
            type: SearchResultType.ExpositoUser,
            id: user._id,
            name: user.name,
            image: user.image,
            email: user.email
        })))

        results = results.concat(repos.map(repo => {
            let repoInfo = getGithubRepoFromFullName(repo.full_name)

            return {
                type: SearchResultType.GithubRepo,
                id: repo.id,
                owner: repoInfo.owner,
                name: repo.name,
                description: repo.description,
                fullName: repo.full_name
            }
        }))

        return results
    }



    private constructor() {
        super()
        this.init()
    }


    private calculateAssignableTokens(): string {
        let total = new BigNumber(this.totalTokenCount)

        for (let shareholder of this.shareholders) 
            total = total.minus(new BigNumber(shareholder.shares))        

        return total.toString()
    }


    private async init() {
        this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion  })
        this.reset()
        this.isLoading = false
    }

}