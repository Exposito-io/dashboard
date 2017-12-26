import * as React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { bind } from 'bind-decorator'


import { PeriodicTransfersStore } from '../../stores/periodic-transfers-store'
import { EditPeriodicTransferStore } from '../../stores/edit-periodic-transfer-store'

import PeriodicTransferList from '../../components/periodic-transfer-list/periodic-transfer-list'
import EditPeriodicTransfer from '../../components/edit-periodic-transfer/edit-periodic-transfer'
import { PeriodicPayment } from 'models'


import './periodic-transfers.css'



type Props = {
    walletId: string
}



@observer
export class PeriodicTransfers extends React.Component<Props> {

    private store: PeriodicTransfersStore
    private editStore: EditPeriodicTransferStore

    constructor(props: Props) {
        super(props)

        if (props.walletId)
            this.store = new PeriodicTransfersStore(props.walletId)

        this.editStore = new EditPeriodicTransferStore()
    }


    @bind onPeriodicTransferClick(periodicTransfer: PeriodicPayment) {
        this.editStore.setPeriodicTransfer()
        this.store.selectPeriodicTransfer(periodicTransfer)
    }

    


    render() {
        return (
            <div className="periodic-transfers-section">
                <div className="main-container">
                    <PeriodicTransferList 
                        list={this.store.periodicPayments} 
                        selectedPeriodicTransfer={this.store.selectedPeriodicTransfer}
                        onItemClick={this.onPeriodicTransferClick}
                    />
                    {this.store.selectedPeriodicTransfer &&
                        <EditPeriodicTransfer 
                            periodicTransfer={this.store.selectedPeriodicTransfer} 
                            store={this.editStore}
                        />                
                    }
                </div>   

                {this.store.selectedPeriodicTransfer &&
                <div className="btn-container">
                    <button 
                        onClick={() => {}}
                        className="btn btn-default btn-main btn-md">
                        Save
                    </button>
                    <button className="btn btn-default btn-md ">Cancel</button>
                </div>   
                }
            </div>
        )
    }


}
