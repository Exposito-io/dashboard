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

        this.store = new EditWalletStore(props.match.params.id, props.history)
        console.log('history', props.history)

        if (this.store.isNewWallet) {
            setTimeout(() => {
                //props.history.push('/wallet/59d69c4c38013a731c7a6ef3')
            }, 5000)
        }

        if (this.store.isNewWallet) {
            //setTimeout(() => this.props.history.push('/wallet/faewfwe/general'), 5000)
        }

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id)
            this.store.setWalletId(nextProps.match.params.id)
    }    

    renderMenu() {
        return (
            <Submenu items={[
                {
                    text: 'General',
                    link: `/wallet/${this.props.match.params.id}/general`,
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
                    <Link to="/wallet/59d69c4c38013a731c7a6ef3">rhdhd</Link>
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
                        <Route exact path="/wallet/:id/periodic-transfers" component={PeriodicTransfers} />
                        <Route exact path="/wallet/:id/payment-widget" component={PaymentWidgetPage} />
                        
                    </Switch>
                </div>
            </Page>
        )
    }


}
