import * as React from 'react'
import * as BigNumber from 'bignumber.js'
import { bind } from 'lodash-decorators'

import { observer } from 'mobx-react'
import { NewProjectStore } from '../new-project-store'
import { ShareholderDescriptionView, GithubShareholdersDescriptionView } from '../shareholders'
import { ShareholderDescription, InvitedShareholderDescription, GithubShareholdersDescription } from 'models'

import { JobManager } from '../../../lib/job-manager'


const store = NewProjectStore.getStore()
const jobManager = JobManager.getManager((window as any).io)

type Props = {
    repo: GithubShareholdersDescriptionView
}

@observer
export class ShareholderRepo extends React.Component<Props> {

    repo: GithubShareholdersDescriptionView

    constructor(props: Props) {
        super(props)
        this.repo = props.repo

        if (this.repo.isWaitingForRepoStats) {
            jobManager.subscribe('repo-stats', this.onRepoStatsComplete)
        }
    }

    
    render() {
        return (
            <div className={`shareholder-repo ${this.repo.isWaitingForRepoStats ?  'loading' : ''}`}>

            </div>
        )
    }


    @bind
    private onRepoStatsComplete(data) {
        // TODO
        console.log('repo-stats completed', data)
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


