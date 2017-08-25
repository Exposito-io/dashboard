import { ShareholderDescription, InvitedShareholderDescription, GithubShareholdersDescription } from 'models'


export class ShareholderDescriptionView extends ShareholderDescription {
    image: string
    email: string
}

export class InvitedShareholderDescriptionView extends InvitedShareholderDescription {
    
}


export class GithubShareholdersDescriptionView extends GithubShareholdersDescription {
    description: string
}