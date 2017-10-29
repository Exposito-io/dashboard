import * as React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'


import { PeriodicTransfersStore } from '../../stores/periodic-transfers-store'

import PeriodicTransferList from '../../comonents/periodic-transfer-list/periodic-transfer-list'
import EditPeriodicTransfer from '../../comonents/edit-periodic-transfer/edit-periodic-transfer'
import { PeriodicPayment } from 'models'


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
                <PeriodicTransferList 
                    list={this.store.periodicPayments} 
                    selectedPeriodicTransfer={this.store.selectedPeriodicTransfer}
                    onItemClick={periodicTransfer => this.store.selectPeriodicTransfer(periodicTransfer)}
                />
                {this.store.selectedPeriodicTransfer ?
                    <EditPeriodicTransfer periodicTransfer={this.store.selectedPeriodicTransfer} />
                :
                    ''
                }
            </div>
        )
    }


}
