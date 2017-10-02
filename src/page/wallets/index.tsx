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
    amount: '0.5',
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
  },  
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
  }, 
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
        <WalletPanel wallet={wallet} transactions={transactions}></WalletPanel>
      </Page>
    );
  }
}
