import { ShareholderDescription, InvitedShareholderDescription, GithubShareholdersDescription } from 'models'
import { SearchResultType } from './search-result-type'


export class ShareholderDescriptionView extends ShareholderDescription {
    name: string
    image: string
    email: string
    type: SearchResultType
}

export class InvitedShareholderDescriptionView extends InvitedShareholderDescription {
    
}


export class GithubShareholdersDescriptionView extends GithubShareholdersDescription {
    description: string
    type: SearchResultType
}