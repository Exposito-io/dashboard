import * as React from 'react'
import * as BigNumber from 'bignumber.js'
import { bind } from 'bind-decorator'

import { setRef, toFixed } from '../../../../lib/tools'
import { ProgressBar } from 'react-blur-admin'
import * as ReactTooltip from 'react-tooltip'

import Slider from 'react-rangeslider'

import 'react-rangeslider/lib/index.css'

import { observer } from 'mobx-react'
import * as Spinner from 'react-spinkit'
import {
    TokenholderDescription,
    InvitedTokenholderDescription,
    GithubTokenholdersDescription,
    RepoAuthor,
    Project,
    Money,
    Tokenholder
} from 'models'




class ExpositoProjectProps {
    project: Project
    amount: Money
    approximateAmount? = false    
}

class ExpositoProjectState {
    isVisible = false
}

@observer
export class ExpositoProject extends React.Component<ExpositoProjectProps, ExpositoProjectState> {

    state = new ExpositoProjectState()


    componentDidMount() {
        setTimeout(() => this.setState({ isVisible: true }), 1)
    }


    render() {
        return (
            <div className={`shareholder shareholder-repo 
                            ${this.state.isVisible ? 'show' : ''}`}>
                <i className="ico exposito"></i>
                <div className="info">
                    <span className="name">{this.props.project.name}</span>
                    <span className="pct main">
                    {this.props.approximateAmount && <span>~ </span>}
                    {this.props.amount.getCurrencyInfo().symbol_native} {this.props.amount.toString()}
                    </span><br />

                    <ProgressBar percentage={100} striped={true}></ProgressBar>

                </div>

                {
                    
                    this.props.project.lastTokenholdersSnapshot.tokenholders.map((tokenholder, i) => 
                        <div key={i} className="shareholder recipient developer" style={{ zIndex: 100 - i }}>
                            <i className="ico github" style={{ backgroundImage: `url(${tokenholder.picture})` }}></i>
                            <div className="info">
                                <span className="name">
                                    {tokenholder.name}
                                </span>
                                <span className="pct">{this.tokenholderAmount(tokenholder)}</span><br />

                                <ProgressBar percentage={this.tokenholderPct(tokenholder) * 100} striped={true}></ProgressBar>

                            </div>
                        </div>
                    )
                }
            </div>
        )
    }


    /**
     * Returns the tokenholder percentage of
     * the total token number
     */
    private tokenholderPct(tokenholder: Tokenholder) {
        let totalTokens = new BigNumber(0)

        for(var auth of this.props.project.lastTokenholdersSnapshot.tokenholders) 
            totalTokens = totalTokens.add(auth.shares)        

        let tokenholderRatio = new BigNumber(tokenholder.shares).dividedBy(totalTokens)

        return tokenholderRatio.toNumber()
    }

    private tokenholderAmount(tokenholder: Tokenholder): string {

        const authorAmount = this.props.amount.multiply(this.tokenholderPct(tokenholder))

        return authorAmount.getCurrencyInfo().symbol_native + ' ' + authorAmount.toString() 
    }
}


