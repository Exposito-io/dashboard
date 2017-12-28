import * as React from 'react'
import * as BigNumber from 'bignumber.js'

import { bind } from 'bind-decorator'

import { setRef } from '../../../../lib/tools'
import { ProgressBar } from 'react-blur-admin'
import { observer } from 'mobx-react'
import { ShareholderDescription, InvitedShareholderDescription, GithubShareholdersDescription } from 'models'

import { toFixed } from '../../../../lib/tools'

import Slider from 'react-rangeslider'

import 'react-rangeslider/lib/index.css'




@observer
export class UserRecipientComponent extends React.Component<{ recipient: any }> {

    el: HTMLDivElement

    get recipient() { console.log(this.props.recipient); return this.props.recipient }

    componentDidMount() {
        setTimeout(() => this.el.classList.add('show'), 1)
    }


    
    render() {
        return (
            <div ref={setRef(this, 'el')} className={`shareholder shareholder-user`}>
                <i className="ico" style={{backgroundImage: `url(${this.recipient.user.image}`}}></i>
                <div className="info">
                    <span className="name">{this.recipient.user.name}</span>
                    <span className="pct">{toFixed(this.pct(), 0)}%</span><br/>
                    
                    <Slider
                        min={0}
                        max={100}
                        value={this.pct()}
                        onChange={e => null}
                    />

                </div> 
            </div>
        )
    }

    /**
     * Returns the shareholder tokens in percentage of
     * the total token number
     */
    private pct() {
        /*
        let total = new BigNumber(store.totalTokenCount)
        let shareholderTokens = new BigNumber(this.user.shares)

        return shareholderTokens.dividedBy(total).toNumber() * 100
        */
        return 90
    }    

}


