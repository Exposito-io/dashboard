import * as React from 'react'
import * as BigNumber from 'bignumber.js'

import { observer } from 'mobx-react'
import { NewProjectStore } from '../new-project-store'
import { ShareholderDescription, InvitedShareholderDescription, GithubShareholdersDescription } from 'models'



const store = NewProjectStore.getStore()



@observer
export class Shareholders extends React.Component {

    private searchBar: HTMLInputElement

    constructor(props: any) {
        super(props)

    }

    // TODO: get shareholder data from database
    render() {
        return (
            <div>
                {store.newProjectParams.shareholders.map(shareholder => {
                    if (ShareholderDescription.validate(shareholder)) {
                        return <div>
                                   {shareholder}
                               </div>
                    }
                    else if (GithubShareholdersDescription.validate(shareholder)) {
                        return <div></div>
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


