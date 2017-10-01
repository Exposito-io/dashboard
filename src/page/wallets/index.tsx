import * as React from 'react'

import { bind } from 'bind-decorator'
import { observer } from 'mobx-react'
import { Panel, Breadcrumbs } from 'react-blur-admin'
import { Page } from '../../components/page'
import { Link } from 'react-router-dom'
import { WalletPanel } from './components/wallet'
import { Wallet, BitcoinWallet } from 'models'

let wallet = new BitcoinWallet({
  coreWallet: {},
  labels: [],
  name: 'gegergreg',
  projectId: 'gge',
  
})

import './wallets.css'

@observer
export class Wallets extends React.Component {

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/'>
          Home
        </Link>
          Wallets
      </Breadcrumbs>
    )
  }

  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title='Wallets' className="wallets-page">
        <WalletPanel wallet={wallet}></WalletPanel>
      </Page>
    );
  }
}
