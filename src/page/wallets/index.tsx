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
  name: 'gegergreg',
  projectId: 'gge',

})

let t1 = new Transaction()

let transactions: Transaction[] = [
  {
    creationDate: new Date('2017-02-04'),
    endDate: new Date('2017-02-04'),
    currency: 'BTC',
    note: '',
    amount: '0.5',
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
