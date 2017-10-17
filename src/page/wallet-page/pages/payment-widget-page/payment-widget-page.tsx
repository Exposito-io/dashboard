import * as React from 'react'

import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'


import { Wallet, BitcoinWallet, Transaction, PaymentDestination } from 'models'
import { Panel } from '../../../../components/panel/panel'


import './payment-widget-page.css'

export class PaymentWidgetPage extends React.Component {


    render() {
        return (
            <div className="payment-widget-page">
                <Panel className="dark options" title="Options">
                    
                </Panel>
            </div>
        )
    }


}
