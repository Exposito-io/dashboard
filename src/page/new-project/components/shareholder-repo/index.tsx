import * as React from 'react'
import * as BigNumber from 'bignumber.js'
import { bind } from 'bind-decorator'

import { setRef } from '../../../../lib/tools'
import { ProgressBar } from 'react-blur-admin'

import Slider from 'react-rangeslider'

import 'react-rangeslider/lib/index.css'

import { observer } from 'mobx-react'
import * as Spinner from 'react-spinkit'
import { NewProjectStore } from '../../new-project-store'
import { ShareholderDescriptionView, GithubShareholdersDescriptionView } from '../../shareholders'
import { ShareholderDescription, 
         InvitedShareholderDescription, 
         GithubShareholdersDescription, 
         RepoAuthor } from 'models'

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
                className={`shareholder shareholder-repo ${this.repo.isWaitingForRepoStats ?  'loading' : ''}`}>
                <i className="ico github"></i>
                <div className="info">
                    <span className="name">{this.repo.githubProject}</span>
                    <span className="pct main">{this.repo.pct.toFixed(0)}%</span><br/>
                    
                    <Slider
                        min={0}
                        max={100}
                        value={this.repo.pct}
                        onChange={this.onValueChange}
                    />
                    {/*<ProgressBar percentage={this.pct()} striped={true}></ProgressBar>*/}

                </div>  

                <div className="loading-container">
                    <Spinner 
                        className="spinner" 
                        name="ball-scale-ripple-multiple" 
                        color="white">
                    </Spinner>
                </div>
                {
                    this.repo.stats && this.repo.stats.authors.map(author => {
                        return <div className="shareholder developer">
                            <i className="ico github" style={{backgroundImage: `url(${author.image})`}}></i>
                            <div className="info">
                                <span className="name">{author.name}</span>
                                <span className="pct">{this.authorPct(author).toFixed(0)}%</span><br/>
                                
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


    private authorPct(author: RepoAuthor): number {
        let pctOfCode = new BigNumber(author.linesOfCode).dividedBy(this.repo.stats.totalLinesOfCode).toNumber()

        return pctOfCode * this.repo.pct
    }
}


