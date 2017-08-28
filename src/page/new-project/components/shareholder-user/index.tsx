import * as React from 'react'
import * as BigNumber from 'bignumber.js'

import { ProgressBar } from 'react-blur-admin'
import { observer } from 'mobx-react'
import { NewProjectStore } from '../../new-project-store'
import { ShareholderDescriptionView, GithubShareholdersDescriptionView } from '../../shareholders'
import { ShareholderDescription, InvitedShareholderDescription, GithubShareholdersDescription } from 'models'

import { JobManager } from '../../../../lib/job-manager'


const store = NewProjectStore.getStore()

;(window as any).NewProjectStore = NewProjectStore


@observer
export class ShareholderUser extends React.Component<{ user: ShareholderDescriptionView }> {

    user: ShareholderDescriptionView

    constructor(props: any) {
        super(props)
        console.log(props.user)
        this.user = props.user
    }

    
    render() {
        console.log('pct: ', this.pct())
        return (
            <div className={`shareholder-user ${this.user.isWaitingForData ?  'loading' : ''}`}>
                <i className="ico" style={{backgroundImage: `url(${this.user.image}`}}></i>
                <div className="info">
                    <span className="name">{this.user.name}</span>
                    <span className="pct">{this.pct().toFixed(0)}%</span><br/>
                    
                    <ProgressBar percentage={this.pct()} striped={true}></ProgressBar>

                </div> 
            </div>
        )
    }

    /**
     * Returns the shareholder tokens in percentage of
     * the total token number
     * @param shareholder 
     */
    private pct() {
        let total = new BigNumber(store.totalTokenCount)
        let shareholderTokens = new BigNumber(this.user.shares)

        return shareholderTokens.dividedBy(total).toNumber() * 100
    }    

}


