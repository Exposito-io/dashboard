import * as React from 'react'

import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Wallet, BitcoinWallet, Transaction, PaymentDestination } from 'models'
import { EditWalletStore } from '../../stores/edit-wallet-store'
import { Panel } from '../../../../components/panel/panel'

import * as TagsInput from 'react-tagsinput'


import './edit-wallet.css'


export class EditWallet extends React.Component<{ store: EditWalletStore }, { tags: string[] }> {

    constructor(props) {
        super(props)

        this.state = {tags: []}
    }

    handleChange(tags) {
        this.setState({tags})
      }

    render() {
        return (
            <div className="edit-wallet">
                <Panel className="dark">
                    <input type="text" placeholder="Wallet name" />
                    <br/>
                    <input type="text" placeholder="Wallet description" />
                    <br/>
                    <TagsInput 
                        inputProps={{placeholder: 'Labels'}} 
                        value={this.state.tags} 
                        onChange={tags => this.handleChange(tags)} 
                    />

                    
                    <div className="btn-container">
                        <button className="btn btn-default btn-main btn-md">Save</button>
                        <button className="btn btn-default btn-md ">Cancel</button>
                    </div>
                </Panel>
            </div>
        )
    }


}
