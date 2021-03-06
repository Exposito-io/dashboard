import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { History } from 'history'
import { bind } from 'bind-decorator'
import { observer } from 'mobx-react'
import { Panel, Breadcrumbs } from 'react-blur-admin'
import { Link } from 'react-router-dom'

import { Page } from '../../components/page'
import { Wallet, BitcoinWallet, Transaction, PaymentDestination } from 'models'
import { EditWallet } from './pages/edit-wallet/edit-wallet'
import { PeriodicTransfers } from './pages/periodic-transfers/periodic-transfers'
import { PaymentWidgetPage } from './pages/payment-widget-page/payment-widget-page'
import { Submenu } from '../../components/submenu/submenu'

import { EditWalletStore } from './stores/edit-wallet-store'



import './wallet-page.css'

type Props = { 
    match: { params: { id?: string } }, 
    history: History
}

@observer
export class WalletPage extends React.Component<Props> {

    private store: EditWalletStore

    constructor(props: Props) {
        super(props)

        this.store = new EditWalletStore(props.match.params.id, props.history)

    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.match.params.id !== nextProps.match.params.id)
            this.store.setWalletId(nextProps.match.params.id)
    }    

    renderMenu() {
        return (
            <Submenu items={[
                {
                    text: 'General',
                    link: `/wallet/${this.props.match.params.id}`,
                    faIcon: 'fa-cogs',
                    disabled: this.store.isNewWallet
                },
                {
                    text: 'Periodic Transfers',
                    link: `/wallet/${this.props.match.params.id}/periodic-transfers`,
                    faIcon: 'fa-credit-card',
                    disabled: this.store.isNewWallet
                },
                {
                    text: 'Payment Widget',
                    link: `/wallet/${this.props.match.params.id}/payment-widget`,
                    faIcon: 'fa-cube',
                    disabled: this.store.isNewWallet
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
                        <Route 
                            exact 
                            path="/wallet/:id" 
                            render={props => <EditWallet store={this.store} {...props} />} 
                        />                        
                        <Route 
                            exact 
                            path="/wallet/:id/periodic-transfers"
                            render={props => <PeriodicTransfers walletId={props.match.params.id} {...props} />}
                        />
                        <Route exact path="/wallet/:id/payment-widget" component={PaymentWidgetPage} />
                        
                    </Switch>
                </div>
            </Page>
        )
    }


}
