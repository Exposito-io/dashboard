import * as React from 'react'
import * as BigNumber from 'bignumber.js'

import { Panel } from 'react-blur-admin'
import { observer } from 'mobx-react'
import { NewProjectStore } from '../../new-project-store'
import { TokenholderDescriptionView, GithubTokenholdersDescriptionView } from '../../shareholders'
import { ShareholderUser } from '../shareholder-user'
import { ShareholderRepo } from '../shareholder-repo'
import { ShareholderUnallocated } from '../shareholder-unallocated'
import { TokenholderDescription, InvitedTokenholderDescription, GithubTokenholdersDescription } from 'models'

import './shareholders.css'

const store = NewProjectStore.getStore()



@observer
export class Shareholders extends React.Component {

    

    constructor(props: any) {
        super(props)

    }

    render() {
        return (
            <Panel className={`new-project-shareholders fs-anim-lower
                               ${store.hasShareholders ? 'has-shareholders' : ''}`}>
                               
                {store.shareholders.map(shareholder => {
                    if (TokenholderDescriptionView.is(shareholder)) {
                        let s = shareholder as TokenholderDescriptionView
                        return <ShareholderUser 
                                  key={s.userId}
                                  user={s}>
                               </ShareholderUser>                    
                    }
                    else if (GithubTokenholdersDescription.validate(shareholder)) {
                        let s = shareholder as GithubTokenholdersDescriptionView
                        return <ShareholderRepo
                                   key={s.githubProject}
                                   repo={s} >
                               </ShareholderRepo>
                    }
                    else {
                        console.log('wrong shareholder data', shareholder)
                        return <div></div>
                    }

                })}

                {
                    store.unallocatedTokens.greaterThan(0) ?
                    <ShareholderUnallocated></ShareholderUnallocated>                 
                    :
                    ''
                }
            </Panel>
        )
    }

    /**
     * Returns the shareholder tokens in percentage of
     * the total token number
     * @param shareholder 
     */
    private pct(shareholder) {
        let total = new BigNumber(store.totalTokenCount)
        let shareholderTokens = new BigNumber(shareholder.shares)

        return shareholderTokens.dividedBy(total).toFixed(0)
    }    

}


