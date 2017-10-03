import * as React from 'react'
import { Switch, Route } from 'react-router-dom'

import { bind } from 'bind-decorator'
import { observer } from 'mobx-react'
import { Panel, Breadcrumbs } from 'react-blur-admin'
import { Page } from '../../components/page'
import { Link } from 'react-router-dom'
import { Wallet, BitcoinWallet, Transaction, PaymentDestination } from 'models'
import { EditWallet } from './pages/edit-wallet/edit-wallet'



import './wallet-page.css'  

@observer
export class WalletPage extends React.Component {

  renderMenu() {
    return (
      <div></div>
    )
  }

  render() {
    return (
      <Page actionBar={this.renderMenu()} title='Wallet' className="wallet-page">
        <div className="wallet-container">
        <Switch>
          <Route exact path="/wallet/:id/general" component={EditWallet}/>          
        </Switch>
        </div>
      </Page>
    )
  }


}
