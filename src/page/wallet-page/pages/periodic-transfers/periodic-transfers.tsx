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

        this.editStore = new EditPeriodicTransferStore(props.walletId)
    }


    @bind onPeriodicTransferClick(periodicTransfer: PeriodicPayment) {
        this.editStore.setPeriodicTransfer(periodicTransfer)
        this.store.selectPeriodicTransfer(periodicTransfer)
    }

    @bind saveClick() {
        this.editStore.save()
        this.store.save()
    }

    @bind cancelClick() {
        this.store.cancel()
    }

    @bind createPeriodicTransfer() {
        const periodicTransfer = this.editStore.createPeriodicTransfer()
        this.store.addPeriodicTransfer(periodicTransfer)
    }

    


    render() {
        return (
            <div className="periodic-transfers-section">

                <div className="main-container">
                    <div className="periodic-transfer-list-container">
                        <div className="add-btn" onClick={this.createPeriodicTransfer}>
                            <svg                                
                                className="plus-icon"version="1.1" viewBox="0 0 16 16"
                                x="0px" y="0px"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M15,6h-5V1c0-0.55-0.45-1-1-1H7C6.45,0,6,0.45,6,1v5H1C0.45,6,0,6.45,0,7v2c0,0.55,0.45,1,1,1h5v5c0,0.55,0.45,1,1,1h2  c0.55,0,1-0.45,1-1v-5h5c0.55,0,1-0.45,1-1V7C16,6.45,15.55,6,15,6z" />
                            </svg> 
                            <span>Add a periodic transfer</span>
                        </div>                    
                        <PeriodicTransferList 
                            list={this.store.periodicPayments} 
                            selectedPeriodicTransfer={this.store.selectedPeriodicTransfer}
                            onItemClick={this.onPeriodicTransferClick}
                        />                    
                    
                    </div>
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
                        onClick={this.saveClick}
                        className="btn btn-default btn-main btn-md">
                        Save
                    </button>
                    <button 
                        onClick={this.cancelClick}
                        className="btn btn-default btn-md "
                    >Cancel</button>
                </div>   
                }
            </div>
        )
    }


}
