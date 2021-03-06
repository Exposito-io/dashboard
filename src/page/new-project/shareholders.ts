import { TokenholderDescription, InvitedTokenholderDescription, GithubTokenholdersDescription, RepoStats } from 'models'
import { SearchResultType } from './search-result-type'


export class TokenholderDescriptionView extends TokenholderDescription {
    name: string
    image: string
    email: string
    isWaitingForData: boolean
    pct?: number

    static is(params: any) {
        return params.userId != null 
            && params.shares != null
    }    

}

export class InvitedTokenholderDescriptionView extends InvitedTokenholderDescription {
    
}


export class GithubTokenholdersDescriptionView extends GithubTokenholdersDescription {
    name: string
    description: string
    pct: number

    /**
     * true if stats for this repo never have been 
     * calculated
     */
    isWaitingForRepoStats: boolean

    stats?: RepoStats


    static is(params: any) {
        return params.githubProject != null 
            && params.shares != null
    }    
}