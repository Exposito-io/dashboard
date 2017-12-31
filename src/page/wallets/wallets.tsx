import * as React from 'react'

import { bind } from 'bind-decorator'
import { observer } from 'mobx-react'
import { Panel, Breadcrumbs } from 'react-blur-admin'
import { Page } from '../../components/page'
import { Link } from 'react-router-dom'
import { WalletPanel } from './components/wallet'
import { Wallet, BitcoinWallet, Transaction, PaymentDestination } from 'models'
import { WalletStore } from './wallet-store'


import './wallets.css'

@observer
export class Wallets extends React.Component {

    private store: WalletStore = WalletStore.getStore()


    renderMenu() {
        return (
            <div></div>
        )
    }

    render() {
        return (
            <Page actionBar={this.renderMenu()} title='Wallets' className="wallets-page">
                <div className="wallets-container">
                    {this.store.wallets.map((walletData, i) => {
                        console.log(walletData.transactions)                       
                        return <WalletPanel 
                            key={i} 
                            wallet={walletData.wallet} 
                            transactions={(walletData.transactions as any).toJS()}
                            periodicTransferCount={walletData.periodicTransferCount}
                        />                       
                        }
                    )}
                    {this.renderAddButton()}
                </div>
            </Page>
        )
    }

    private renderAddButton() {
        return (
            <Link className="add-btn" to="/wallet/new">
                <div className="content">
                    <span>New Wallet</span>
                    <svg
                        className="plus-icon"
                        height="16px"
                        /*style="enable-background:new 0 0 16 16;" */
                        version="1.1"
                        viewBox="0 0 16 16"
                        width="16px"
                        x="0px"
                        /*xml:space="preserve" */
                        xmlns="http://www.w3.org/2000/svg"
                        y="0px">
                        <path d="M15,6h-5V1c0-0.55-0.45-1-1-1H7C6.45,0,6,0.45,6,1v5H1C0.45,6,0,6.45,0,7v2c0,0.55,0.45,1,1,1h5v5c0,0.55,0.45,1,1,1h2  c0.55,0,1-0.45,1-1v-5h5c0.55,0,1-0.45,1-1V7C16,6.45,15.55,6,15,6z" />
                    </svg>
                </div>
            </Link>
        )
    }
}
