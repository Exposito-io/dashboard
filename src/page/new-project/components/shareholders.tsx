import * as React from 'react'
import * as BigNumber from 'bignumber.js'

import { observer } from 'mobx-react'
import { NewProjectStore } from '../new-project-store'
import { ShareholderDescriptionView, GithubShareholdersDescriptionView } from '../shareholders'
import { ShareholderUser } from './shareholder-user'
import { ShareholderRepo } from './shareholder-repo'
import { ShareholderDescription, InvitedShareholderDescription, GithubShareholdersDescription } from 'models'



const store = NewProjectStore.getStore()



@observer
export class Shareholders extends React.Component {

    

    constructor(props: any) {
        super(props)

    }

    render() {
        return (
            <div className="shareholders">
                {store.shareholders.map(shareholder => {
                    if (ShareholderDescriptionView.is(shareholder)) {
                        let s = shareholder as ShareholderDescriptionView
                        return <ShareholderUser 
                                  key={s.userId}
                                  user={s}>
                               </ShareholderUser>                    
                    }
                    else if (GithubShareholdersDescription.validate(shareholder)) {
                        let s = shareholder as GithubShareholdersDescriptionView
                        return <ShareholderRepo
                                   key={s.githubProject}
                                   repo={s} >
                               </ShareholderRepo>
                    }
                    else {
                        return <div></div>
                    }

                })}
            </div>
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


