import * as React from 'react'

import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Wallet, BitcoinWallet, Transaction, PaymentDestination } from 'models'
import { EditWalletStore } from '../../stores/edit-wallet-store'
import { Panel } from '../../../../components/panel/panel'

import * as TagsInput from 'react-tagsinput'


import './edit-wallet.css'


@observer
export class EditWallet extends React.Component<{ store: EditWalletStore }, { }> {

    constructor(props) {
        super(props)

    }

    


    render() {
        return (
            <div className="edit-wallet">
                <Panel className="dark">
                    <input 
                        type="text" 
                        placeholder="Wallet name" 
                        value={this.props.store.walletName} 
                        onChange={e => this.props.store.setWalletName(e.target.value)}
                    />
                    <br/>
                    <input 
                        type="text" 
                        placeholder="Wallet description" 
                        value={this.props.store.walletDescription} 
                        onChange={e => this.props.store.setWalletDescription(e.target.value)}
                    />
                    <br/>
                    <TagsInput 
                        inputProps={{placeholder: 'Add labels'}} 
                        value={this.props.store.walletLabels} 
                        onChange={tags => this.props.store.setWalletLabels(tags)} 
                    />

                    
                    <div className="btn-container">
                        <button 
                            onClick={() => this.props.store.save()}
                            className="btn btn-default btn-main btn-md">
                            Save
                        </button>
                        <button className="btn btn-default btn-md ">Cancel</button>
                    </div>
                </Panel>
            </div>
        )
    }


}
