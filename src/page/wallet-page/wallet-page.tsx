import * as React from 'react'
import { Switch, Route } from 'react-router-dom'

import { bind } from 'bind-decorator'
import { observer } from 'mobx-react'
import { Panel, Breadcrumbs } from 'react-blur-admin'
import { Page } from '../../components/page'
import { Link } from 'react-router-dom'
import { Wallet, BitcoinWallet, Transaction, PaymentDestination } from 'models'
import { EditWallet } from './pages/edit-wallet/edit-wallet'
import { PeriodicTransfers } from './pages/periodic-transfers/periodic-transfers'
import { PaymentWidgetPage } from './pages/payment-widget-page/payment-widget-page'
import { Submenu } from '../../components/submenu/submenu'

import { EditWalletStore } from './stores/edit-wallet-store'



import './wallet-page.css'

@observer
export class WalletPage extends React.Component<any> {

    private store: EditWalletStore

    constructor(props: any) {
        super(props)

        this.store = new EditWalletStore(props.match.params.id)

        if (this.store.isNewWallet) {
            //setTimeout(() => this.props.history.push('/wallet/faewfwe/general'), 5000)
        }

    }

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
            ]} />
        )
    }


    render() {
        return (
            <Page actionBar={this.renderMenu()} title={this.store.pageTitle} className="wallet-page">
                <div className="wallet-container">
                    <Switch>
                        <Route 
                            exact 
                            path="/wallet/new" 
                            render={props => <EditWallet store={this.store} {...props} />} 
                        />
                        <Route 
                            exact 
                            path="/wallet/:id/general" 
                            render={props => <EditWallet store={this.store} {...props} />} 
                        />
                        <Route exact path="/wallet/:id/periodic-transfers" component={PeriodicTransfers} />
                        <Route exact path="/wallet/:id/payment-widget" component={PaymentWidgetPage} />
                    </Switch>
                </div>
            </Page>
        )
    }


}
