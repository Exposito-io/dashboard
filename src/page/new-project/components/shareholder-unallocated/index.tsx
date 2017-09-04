import * as React from 'react'
import * as BigNumber from 'bignumber.js'

import { bind } from 'bind-decorator'

import { setRef } from '../../../../lib/tools'
import { ProgressBar } from 'react-blur-admin'
import { observer } from 'mobx-react'
import { NewProjectStore } from '../../new-project-store'
import { ShareholderDescriptionView, GithubShareholdersDescriptionView } from '../../shareholders'
import { ShareholderDescription, InvitedShareholderDescription, GithubShareholdersDescription } from 'models'

import { toFixed } from '../../../../lib/tools'

import Slider from 'react-rangeslider'

import 'react-rangeslider/lib/index.css'

import { JobManager } from '../../../../lib/job-manager'


const store = NewProjectStore.getStore()



@observer
export class ShareholderUnallocated extends React.Component<{  }> {

    user: ShareholderDescriptionView
    el: HTMLDivElement

    constructor(props: any) {
        super(props)
    }


    componentDidMount() {
        setTimeout(() => this.el.classList.add('show'), 1)
    }


    
    render() {
        return (
            <div ref={setRef(this, 'el')} 
                 className={`shareholder shareholder-user`}>
                <i className="ico" style={{backgroundImage: 'url(https://cdn1.iconfinder.com/data/icons/navigation-and-ui-menu/32/caution_attention_required_circle-512.png)'}}></i>
                <div className="info">
                    <span className="name">Unallocated</span>
                    <span className="pct">{toFixed(this.pct(), 0)}%</span><br/>
                    
                    <ProgressBar percentage={this.pct()} striped={true}></ProgressBar>

                </div> 
            </div>
        )
    }

    /**
     * Returns the shareholder tokens in percentage of
     * the total token number
     */
    private pct() {
        let unallocated = new BigNumber(store.unallocatedTokens)
        let total = new BigNumber(store.totalTokenCount)

        return unallocated.dividedBy(total).toNumber() * 100
    }    

}


