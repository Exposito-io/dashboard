import * as React from 'react'
import * as BigNumber from 'bignumber.js'

import { observer } from 'mobx-react'
import { NewProjectStore } from '../new-project-store'
import { ShareholderDescriptionView, GithubShareholdersDescriptionView } from '../shareholders'
import { ShareholderDescription, InvitedShareholderDescription, GithubShareholdersDescription } from 'models'

import { JobManager } from '../../../lib/job-manager'


const store = NewProjectStore.getStore()



@observer
export class ShareholderUser extends React.Component {

    user: ShareholderDescription

    constructor(props: any) {
        super(props)
        this.user = props.user
    }

    // TODO: get shareholder data from database
    render() {
        return (
            <div className="shareholder-user">

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


