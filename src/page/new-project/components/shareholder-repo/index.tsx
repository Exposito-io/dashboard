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
import { NewProjectStore } from '../../new-project-store'
import { ShareholderDescriptionView, GithubShareholdersDescriptionView } from '../../shareholders'
import {
    ShareholderDescription,
    InvitedShareholderDescription,
    GithubShareholdersDescription,
    RepoAuthor
} from 'models'


const store = NewProjectStore.getStore()

type Props = {
    repo: GithubShareholdersDescriptionView
}

@observer
export class ShareholderRepo extends React.Component<Props, { isVisible: boolean }> {

    el: HTMLDivElement

    constructor(props: Props) {
        super(props)
        
        this.state = { isVisible: false }

    }


    componentDidMount() {
        setTimeout(() => this.setState({ isVisible: true }), 1)
    }

    @bind
    onValueChange(value, e) {
        store.setSharesPct(this.props.repo, value)
    }


    render() {
        return (
            <div ref={setRef(this, 'el')}
                className={`shareholder shareholder-repo 
                            ${this.props.repo.isWaitingForRepoStats ? 'loading' : ''}
                            ${this.state.isVisible ? 'show' : ''}`}>
                <i className="ico github"></i>
                <div className="info">
                    <span className="name">{this.props.repo.githubProject}</span>
                    <span className="pct main">{toFixed(this.pct(), 0)}%</span><br />

                    <Slider
                        min={0}
                        max={100}
                        value={this.pct()}
                        onChange={this.onValueChange}
                    />

                </div>

                <div className="loading-container">
                    <Spinner
                        className="spinner"
                        name="ball-scale-ripple-multiple"
                        color="white">
                    </Spinner>
                </div>
                {
                    this.props.repo.stats && this.props.repo.stats.authors.map((author, i) => {
                        return <div key={i} className="shareholder developer">
                            <i className="ico github" style={{ backgroundImage: `url(${author.image})` }}></i>
                            <div className="info">
                                <span className="name">
                                    {author.name}
                                </span>
                                <span className="pct">{toFixed(this.authorPct(author), 0)}%</span><br />
                                <i className="info-icon fa fa-code" data-tip data-for={`info-tooltip-${i}`}></i>
                                <ReactTooltip 
                                    className="info-tooltip" 
                                    id={`info-tooltip-${i}`}
                                    place="bottom" 
                                    effect="solid">
                                    <strong>{author.linesOfCode}</strong> lines of code<br/>
                                    <strong>{author.fileCount}</strong> files modified
                                </ReactTooltip>
                                <ProgressBar percentage={this.authorPct(author)} striped={true}></ProgressBar>

                            </div>
                        </div>
                    })
                }
            </div>
        )
    }


    /**
     * Returns the shareholder tokens in percentage of
     * the total token number
     */
    private pct() {
        let total = new BigNumber(store.totalTokenCount)
        let shareholderTokens = new BigNumber(this.props.repo.shares)

        return shareholderTokens.dividedBy(total).toNumber() * 100
    }

    private authorPct(author: RepoAuthor): number {
        let pctOfCode = new BigNumber(author.linesOfCode).dividedBy(this.props.repo.stats.totalLinesOfCode).toNumber()

        return pctOfCode * this.pct()
    }
}


