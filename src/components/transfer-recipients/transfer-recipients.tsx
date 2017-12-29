import * as React from 'react'
import * as BigNumber from 'bignumber.js'

import { Panel } from 'react-blur-admin'
import { observer } from 'mobx-react'
import * as Switch from 'literal-switch'

import { UserRecipientComponent } from './components/user-recipient-component/user-recipient-component'
import { ExpositoProject } from './components/exposito-project/exposito-project'

import { 
    TokenholderDescription, 
    InvitedTokenholderDescription, 
    GithubTokenholdersDescription,
    DestinationOptions,
    ProjectTokenholdersDistribution,
    UserDestination,
    Money
} from 'models'

import './transfer-recipients.css'


class TransferRecipientsProps {
    amount?: Money
    destinations: any
    approximativeAmount? = false
}


@observer
export class TransferRecipients extends React.Component<TransferRecipientsProps> {

    get amount() { return this.props.amount }
    get destinations() { return this.props.destinations }

    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div className="transfer-recipients">
                {
                    (() => {
                        if (UserDestination.runtimeType().is(this.destinations)) 
                            return <UserRecipientComponent 
                                        recipient={this.destinations} 
                                        amount={this.amount} 
                                        approximateAmount={this.props.approximativeAmount}
                                    />
                        else if (true)
                            return <ExpositoProject />
                    })()
                }
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


