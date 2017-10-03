import * as React from 'react'
import { Switch, Route } from 'react-router-dom'

import { bind } from 'bind-decorator'
import { observer } from 'mobx-react'
import { Panel, Breadcrumbs } from 'react-blur-admin'
import { Page } from '../../components/page'
import { Link } from 'react-router-dom'
import { Wallet, BitcoinWallet, Transaction, PaymentDestination } from 'models'
import { EditWallet } from './pages/edit-wallet/edit-wallet'
import { Submenu } from '../../components/submenu/submenu'



import './wallet-page.css'  

@observer
export class WalletPage extends React.Component<any> {

  renderMenu() {
    return (
      <Submenu items={[
        {
          text: 'General',
          link: `/wallet/${this.props.match.params.id}/general`,
          faIcon: 'fa-cogs',          
        },
        {
          text: 'Periodic Transfers',
          link: `/wallet/${this.props.match.params.id}/periodic-transfers`,
          faIcon: 'fa-credit-card',          
        },
        {
          text: 'Payment Widget',
          link: `/wallet/${this.props.match.params.id}/payment-widget`,
          faIcon: 'fa-cube',          
        }          
      ]}/>
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
