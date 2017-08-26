import * as React from 'react'
import * as BigNumber from 'bignumber.js'

import { observer } from 'mobx-react'
import { NewProjectStore } from '../new-project-store'
import { ShareholderDescriptionView, GithubShareholdersDescriptionView } from '../shareholders'
import { ShareholderDescription, InvitedShareholderDescription, GithubShareholdersDescription } from 'models'

import { JobManager } from '../../../lib/job-manager'


const store = NewProjectStore.getStore()
const jobManager = JobManager.getManager((window as any).io)



@observer
export class ShareholderRepo extends React.Component<{ repo: GithubShareholdersDescriptionView }> {

    repo: GithubShareholdersDescriptionView

    constructor(props: any) {
        super(props)
        this.repo = props.repo
    }

    
    render() {
        return (
            <div className={`shareholder-repo ${this.repo.isWaitingForRepoStats ?  'loading' : ''}`}>

            </div>
        )
    }

    /**
     * Returns the shareholder tokens in percentage of
     * the total token number
     * @param shareholder 
     */
    private pct(shareholder) {
        let total = new BigNumber(store.totalTokenCount)
        let shareholderTokens = new BigNumber(shareholder.shares)

        return shareholderTokens.dividedBy(total).toFixed(0)
    }    

}


