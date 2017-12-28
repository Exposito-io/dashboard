import * as React from 'react'
import * as BigNumber from 'bignumber.js'

import { Panel } from 'react-blur-admin'
import { observer } from 'mobx-react'
//import { ShareholderUser } from './components/shareholder-user'
//import { ShareholderRepo } from './components/shareholder-repo'
import { 
    ShareholderDescription, 
    InvitedShareholderDescription, 
    GithubShareholdersDescription,
    DestinationOptions
} from 'models'

import './transfer-recipients.css'


class TransferRecipientsProps {
    amount?: string
    destinations: DestinationOptions[]
}


@observer
export class TransferRecipients extends React.Component<TransferRecipientsProps> {

    

    constructor(props: any) {
        super(props)

    }

    render() {
        return (
            <div>
                hello
            {/*}
            <Panel className={`new-project-shareholders fs-anim-lower
                               ${store.hasShareholders ? 'has-shareholders' : ''}`}>
                               
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
                        console.log('wrong shareholder data', shareholder)
                        return <div></div>
                    }

                })}
            </Panel>
            */}
            </div>
        )
    }

    /**
     * Returns the shareholder tokens in percentage of
     * the total token number
     * @param shareholder 
     */
    private pct(shareholder) {
        /*
        let total = new BigNumber(store.totalTokenCount)
        let shareholderTokens = new BigNumber(shareholder.shares)

        return shareholderTokens.dividedBy(total).toFixed(0)*/
    }    

}


