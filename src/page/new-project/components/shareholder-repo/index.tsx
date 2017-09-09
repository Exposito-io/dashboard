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

import { JobManager } from '../../../../lib/job-manager'


const store = NewProjectStore.getStore()
const jobManager = JobManager.getManager()

type Props = {
    repo: GithubShareholdersDescriptionView
}

@observer
export class ShareholderRepo extends React.Component<Props> {

    repo: GithubShareholdersDescriptionView
    el: HTMLDivElement

    constructor(props: Props) {
        super(props)
        this.repo = props.repo

        if (this.repo.isWaitingForRepoStats) {
            jobManager.subscribe('repo-stats', this.onRepoStatsComplete)
        }
        else {
            console.log(`Repo stats already available: ${this.repo.githubProject}`)
        }
    }


    componentDidMount() {
        setTimeout(() => this.el.classList.add('show'), 1)
    }

    @bind
    onValueChange(value, e) {
        store.setSharesPct(this.repo, value)
    }


    render() {
        return (
            <div ref={setRef(this, 'el')}
                className={`shareholder shareholder-repo ${this.repo.isWaitingForRepoStats ? 'loading' : ''}`}>
                <i className="ico github"></i>
                <div className="info">
                    <span className="name">{this.repo.githubProject}</span>
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
                    this.repo.stats && this.repo.stats.authors.map((author, i) => {
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


    @bind
    private onRepoStatsComplete(data) {
        // TODO
        console.log('repo-stats completed', data)
    }

    /**
     * Returns the shareholder tokens in percentage of
     * the total token number
     */
    private pct() {
        let total = new BigNumber(store.totalTokenCount)
        let shareholderTokens = new BigNumber(this.repo.shares)

        return shareholderTokens.dividedBy(total).toNumber() * 100
    }

    private authorPct(author: RepoAuthor): number {
        let pctOfCode = new BigNumber(author.linesOfCode).dividedBy(this.repo.stats.totalLinesOfCode).toNumber()

        return pctOfCode * this.pct()
    }
}


