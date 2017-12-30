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
    Money
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
                <i className="ico github"></i>
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
                        <div key={i} className="shareholder developer" style={{ zIndex: 100 - i }}>
                            <i className="ico github" style={{ backgroundImage: `url(${tokenholder.picture})` }}></i>
                            <div className="info">
                                <span className="name">
                                    {tokenholder.name}
                                </span>
                                <span className="pct">{toFixed(this.authorPct(tokenholder), 0)}%</span><br />
                                <i className="info-icon fa fa-code" data-tip data-for={`info-tooltip-${i}`}></i>

                                <ProgressBar percentage={this.authorPct(tokenholder)} striped={true}></ProgressBar>

                            </div>
                        </div>
                    )
                }
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
        let shareholderTokens = new BigNumber(this.props.repo.shares)

        return shareholderTokens.dividedBy(total).toNumber() * 100*/
        return 100
    }

    private authorPct(author: any): number {
        /*
        let pctOfCode = new BigNumber(author.linesOfCode).dividedBy(this.props.repo.stats.totalLinesOfCode).toNumber()

        return pctOfCode * this.pct()*/
        return 100
    }
}


