import * as React from 'react'
import * as BigNumber from 'bignumber.js'

import { bind } from 'bind-decorator'

import { setRef } from '../../../../lib/tools'
import { ProgressBar } from 'react-blur-admin'
import { observer } from 'mobx-react'
import { NewProjectStore } from '../../new-project-store'
import { ShareholderDescriptionView, GithubShareholdersDescriptionView } from '../../shareholders'
import { ShareholderDescription, InvitedShareholderDescription, GithubShareholdersDescription } from 'models'

import Slider from 'react-rangeslider'

import 'react-rangeslider/lib/index.css'

import { JobManager } from '../../../../lib/job-manager'


const store = NewProjectStore.getStore()

;(window as any).NewProjectStore = NewProjectStore


@observer
export class ShareholderUser extends React.Component<{ user: ShareholderDescriptionView }> {

    user: ShareholderDescriptionView
    el: HTMLDivElement

    constructor(props: any) {
        super(props)
        console.log(props.user)
        this.user = props.user
    }


    componentDidMount() {
        setTimeout(() => this.el.classList.add('show'), 1)
    }


    @bind
    onValueChange(value, e) {
        store.setSharesPct(this.user, value)
    }    

    
    render() {
        return (
            <div ref={setRef(this, 'el')} 
                 className={`shareholder shareholder-user ${this.user.isWaitingForData ?  'loading' : ''}`}>
                <i className="ico" style={{backgroundImage: `url(${this.user.image}`}}></i>
                <div className="info">
                    <span className="name">{this.user.name}</span>
                    <span className="pct">{this.pct().toFixed(0)}%</span><br/>
                    
                    <Slider
                        min={0}
                        max={100}
                        value={this.pct()}
                        onChange={this.onValueChange}
                    />

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


