import * as React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'


import { PeriodicTransfersStore } from '../../stores/periodic-transfers-store'

import PeriodicTransferList from '../../comonents/periodic-transfer-list/periodic-transfer-list'
import { Wallet, BitcoinWallet, Transaction, PaymentDestination } from 'models'


import './periodic-transfers.css'


type Props = {
    walletId: string
}



@observer
export class PeriodicTransfers extends React.Component<Props> {

    private store: PeriodicTransfersStore

    constructor(props: Props) {
        super(props)

        if (props.walletId)
            this.store = new PeriodicTransfersStore(props.walletId)
    }


    render() {
        return (
            <div className="periodic-transfers-section">
                Periodic transfers
                <PeriodicTransferList list={this.store.periodicPayments} />
            </div>
        )
    }


}
