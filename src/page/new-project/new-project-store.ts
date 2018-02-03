import { autorun, observable, computed, action } from 'mobx'
import { Project, CreateProjectTokenholdersDistributionParams, 
         TokenholderDescription, InvitedTokenholderDescription, 
         GithubTokenholdersDescription, RepoStats } from 'models'
import { TokenholderDescriptionView, GithubTokenholdersDescriptionView } from './shareholders'
import { debounce } from 'lodash-decorators'
import { ExpositoClient } from 'exposito-client'
import { Store } from '../../stores/store'
import { SearchResultType } from './search-result-type'
import { getGithubRepoFromFullName, isQueueJob } from '../../lib/tools'
import config from '../../config'
import * as BigNumber from 'bignumber.js'
import { bind } from 'bind-decorator'
import { preferencesStore } from '../../stores/preferences-store'
import { JobManager } from '../../lib/job-manager'


const jobManager = JobManager.getManager()


/**
 * Store used by new-project section
 */
export class NewProjectStore extends Store {

    private static instance: NewProjectStore

    @observable projectName: string
    @observable projectDescription: string

    @observable searchQuery: string
    @observable searchResults: any[] = []

    @computed get hasSearchResults() { return this.searchResults.length > 0 }
    @observable searchHasFocus: boolean

    @observable newProjectParams: CreateProjectTokenholdersDistributionParams
    @observable shareholders: (TokenholderDescriptionView | GithubTokenholdersDescriptionView)[]
    @computed get hasShareholders() { return this.shareholders.length > 0 }

    @computed get unallocatedTokens(): BigNumber.BigNumber {
        let totalAllocated = this.shareholders.reduce((total: BigNumber.BigNumber, shareholder) => {
            return total.add(new BigNumber(shareholder.shares))
        }, new BigNumber(0))

        return new BigNumber(this.totalTokenCount).minus(totalAllocated)
    }

    @observable isSubmitting: boolean = false
    @observable isSubmitted: boolean = false

    @computed get equityChartData() {
        let chartData = this.shareholders.map(shareholder => ({
            name: shareholder.name,
            value: parseInt(shareholder.shares, 10)
        }))



        if (this.unallocatedTokens.greaterThan(0)) {
            chartData.push({
                name: 'Unallocated',
                value: this.unallocatedTokens.toNumber()
            })
        }

        return chartData
    }

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
                        name: searchResult.fullName,
                        githubProject: searchResult.fullName,
                        description: '',
                        shares: tokens,
                        pct: this.calculatePct(tokens),
                        isWaitingForRepoStats: true
                    })


                }
                // Repo stats are already in server cache
                else {
                    this.shareholders.push(await this.createGithubTokenholdersDescriptionView(repo, tokens)) 
                }
                break
            
            default: break
        }

        this.searchResults = []
    }


    @action removeShareholder(shareholder: TokenholderDescriptionView | GithubTokenholdersDescriptionView) {
        let index = this.shareholders.indexOf(shareholder)
        this.shareholders.splice(index, 1)
    }



    /**
     * Search for Github repos and Exposito users
     * @param query 
     */
    @action async search(query: string): Promise<void> {
        let results = await Promise.all([this.client.users.find(query), this.client.github.findRepos(query)])
        
        this.searchResults = this.parseResults(results[0], results[1])
    }


    /**
     * Change the total token number
     * @param amount 
     */
    @action setTotalTokenCount(newAmount: string): void {
        let oldAmount = new BigNumber(this.totalTokenCount)

        let percentages = this.shareholders.map(tokenholder => new BigNumber(tokenholder.shares).dividedBy(oldAmount))

        this.totalTokenCount = newAmount

        for (let i = 0; i < this.shareholders.length; i++) 
            this.shareholders[i].shares = percentages[i].mul(newAmount).toFixed(0)
        

    }

    /**
     * Sets the percentage of tokens for a specific
     * token holder
     * @param shareholder 
     * @param value 
     */
    @action setSharesPct(shareholder: TokenholderDescriptionView | GithubTokenholdersDescriptionView, 
                         value: number): void {
        let totalTokens = new BigNumber(this.totalTokenCount)
        let tokensValue = totalTokens.mul(value / 100)

        if (tokensValue.lessThanOrEqualTo(this.unallocatedTokens.plus(shareholder.shares)))
            shareholder.shares = tokensValue.toString()
        else
            shareholder.shares = this.unallocatedTokens.plus(shareholder.shares).toString()

        shareholder.pct = this.calculatePct(shareholder.shares)
    }

    @action async submit() {
        this.isSubmitting = true

        
        await this.client.projects.createProject({
            name: this.projectName,
            description: this.projectDescription,
            shareholders: this.shareholders,
            members: [],
            githubProjects: []
        })

        this.submitted()
    }

    @action submitted() {
        this.isSubmitting = false
        this.isSubmitted = true
    }



    @action reset() {
        this.projectName = ""
        this.searchResults = []
        this.newProjectParams = new CreateProjectTokenholdersDistributionParams()
        this.shareholders = []
        this.totalTokenCount = '10000000'
    }




    private constructor() {
        super()
        this.init()

        ;(window as any).newProjectStore = this
    }


    private calculateAssignableTokens(): string {
        let total = new BigNumber(this.totalTokenCount)

        for (let shareholder of this.shareholders) 
            total = total.minus(new BigNumber(shareholder.shares))        

        return total.toString()
    }


    private calculatePct(tokens: string): number {
        return new BigNumber(tokens)
                    .dividedBy(this.totalTokenCount)
                    .mul(100)
                    .toNumber()
    }


    private async createGithubTokenholdersDescriptionView(repo: RepoStats, tokens: string): Promise<GithubTokenholdersDescriptionView> {
        repo.authors = repo.authors
                            .filter(author => new BigNumber(author.linesOfCode).greaterThan(0))
                            .sort((a, b) => (new BigNumber(b.linesOfCode).sub(a.linesOfCode).toNumber()))
                            

        return {
            name: `${repo.owner}/${repo.repo}`,
            githubProject: `${repo.owner}/${repo.repo}`,
            description: '',
            shares: tokens,
            pct: this.calculatePct(tokens),
            isWaitingForRepoStats: false,
            stats: repo
        }
    }


    @bind
    private async onRepoStatsComplete(data: RepoStats) {
        console.log('NewProjectStore: repo-stats completed', data)
        if (data) {

            for(let i = 0; i< this.shareholders.length; i++) {
                if (this.shareholders[i].name === `${data.owner}/${data.repo}`) {
                    let shareholder = await this.createGithubTokenholdersDescriptionView(data, this.shareholders[i].shares)
                    let shareholders = this.shareholders.splice(i, 1, shareholder)
                    //this.shareholders = this.shareholders
                }
            }
        }
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


    private async init() {
        this.client = new ExpositoClient({ url: config.apiUrl, version: config.apiVersion  })
        jobManager.subscribe('repo-stats', this.onRepoStatsComplete)
        this.reset()
        this.isLoading = false
    }

}