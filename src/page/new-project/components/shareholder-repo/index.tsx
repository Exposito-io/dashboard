import * as React from 'react'
import * as BigNumber from 'bignumber.js'
import { bind } from 'lodash-decorators'

import { setRef } from '../../../../lib/tools'
import { ProgressBar } from 'react-blur-admin'

import { observer } from 'mobx-react'
import { NewProjectStore } from '../../new-project-store'
import { ShareholderDescriptionView, GithubShareholdersDescriptionView } from '../../shareholders'
import { ShareholderDescription, InvitedShareholderDescription, GithubShareholdersDescription } from 'models'

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

    
    render() {
        return (
            <div ref={setRef(this, 'el')} 
                className={`shareholder shareholder-repo ${this.repo.isWaitingForRepoStats ?  'loading' : ''}`}>
                <i className="ico github"></i>
                <div className="info">
                    <span className="name">{this.repo.githubProject}</span>
                    <span className="pct">{this.pct().toFixed(0)}%</span><br/>
                    
                    <ProgressBar percentage={this.pct()} striped={true}></ProgressBar>

                </div>  

                {
                    this.repo.stats.authors.map(author => {
                        return <div className="shareholder developer">
                            <i className="ico github" style={{backgroundImage: `url(${author.name})`}}></i>
                            <div className="info">
                                <span className="name">{author.name}</span>
                                <span className="pct">{this.pct().toFixed(0)}%</span><br/>
                                
                                <ProgressBar percentage={this.pct()} striped={true}></ProgressBar>

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
     * @param shareholder 
     */
    private pct() {
        let total = new BigNumber(store.totalTokenCount)
        let shareholderTokens = new BigNumber(this.repo.shares)

        return shareholderTokens.dividedBy(total).toNumber() * 100
    } 

}


