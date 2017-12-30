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
    Project,
    User,
    UserDestination,
    Money
} from 'models'

import './transfer-recipients.css'


class TransferRecipientsProps {
    amount?: Money
    recipient: User | Project
    approximativeAmount? = false
}


@observer
export class TransferRecipients extends React.Component<TransferRecipientsProps> {

    get amount() { return this.props.amount }
    get recipient() { return this.props.recipient }

    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div className="transfer-recipients">
                {
                    (() => {
                        if (User.runtimeType().is(this.recipient)) 
                            return <UserRecipientComponent 
                                        recipient={this.recipient} 
                                        amount={this.amount} 
                                        approximateAmount={this.props.approximativeAmount}
                                    />
                        else if (Project.runtimeType().is(this.recipient))
                            return <ExpositoProject 
                                        project={this.recipient}
                                        amount={this.amount}
                                        approximateAmount={this.props.approximativeAmount}
                                    />
                        else
                            return <div></div>
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


