import * as React from 'react'

import { bind } from 'bind-decorator'
import { observer } from 'mobx-react'
import { Panel, Breadcrumbs } from 'react-blur-admin'
import { Page } from '../../components/page'
import { Link } from 'react-router-dom'
import { WalletPanel } from './components/wallet'
import { Wallet, BitcoinWallet, Transaction, PaymentDestination } from 'models'

let wallet = new BitcoinWallet({
  coreWallet: {},
  labels: [],
  name: 'Main Wallet',
  projectId: 'gge',

})

let t1 = new Transaction()

let transactions: Transaction[] = [
  {
    creationDate: new Date('2017-02-04'),
    endDate: new Date('2017-02-04'),
    currency: 'BTC',
    note: 'Transfer from personnal account',
    amount: '0.53123',
    sourceType: PaymentDestination.BITCOIN_ADDRESS,
    sourceWalletId: 'afew',
    destination: 'awf',
    destinationType: PaymentDestination.EXPOSITO_WALLET,
    status: 1
  },
  {
    creationDate: new Date('2017-02-21'),
    endDate: new Date('2017-02-21'),
    currency: 'BTC',
    note: 'Design of the intro page',
    amount: '-0.145',
    sourceType: PaymentDestination.BITCOIN_ADDRESS,
    sourceWalletId: 'afew',
    destination: 'awf',
    destinationType: PaymentDestination.EXPOSITO_WALLET,
    status: 1
  }, /* 
  {
    creationDate: new Date('2017-03-14'),
    endDate: new Date('2017-03-14'),
    currency: 'ETH',
    note: 'Donation',
    amount: '0.318',
    sourceType: PaymentDestination.ETHEREUM_ADDRESS,
    sourceWalletId: 'afew',
    destination: 'awf',
    destinationType: PaymentDestination.EXPOSITO_WALLET,
    status: 1
  }, */
  {
    creationDate: new Date('2017-04-03'),
    endDate: new Date('2017-04-03'),
    currency: 'BTC',
    note: 'Mathew\'s deposit',
    amount: '0.293',
    sourceType: PaymentDestination.BITCOIN_ADDRESS,
    sourceWalletId: 'afew',
    destination: 'awf',
    destinationType: PaymentDestination.EXPOSITO_WALLET,
    status: 1
  }    
]

import './wallets.css'  

@observer
export class Wallets extends React.Component {

  renderMenu() {
    return (
      <div></div>
    )
  }

  render() {
    return (
      <Page actionBar={this.renderMenu()} title='Wallets' className="wallets-page">
        <div className="wallets-container">
          <WalletPanel wallet={wallet} transactions={transactions}></WalletPanel>
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
              <path d="M15,6h-5V1c0-0.55-0.45-1-1-1H7C6.45,0,6,0.45,6,1v5H1C0.45,6,0,6.45,0,7v2c0,0.55,0.45,1,1,1h5v5c0,0.55,0.45,1,1,1h2  c0.55,0,1-0.45,1-1v-5h5c0.55,0,1-0.45,1-1V7C16,6.45,15.55,6,15,6z"/>
          </svg>
        </div>
      </Link>
    )
  }
}
