import * as React from 'react'

import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { bind } from 'bind-decorator'


import { PeriodicPayment, FixedPayment } from 'models'
import { Panel } from '../../../../components/panel/panel'


import './periodic-transfer-list.css'

type Props = {
    list: PeriodicPayment[]
    onItemClick?: (item: PeriodicPayment) => any
    selectedPeriodicTransfer?: PeriodicPayment
}

@observer
export default class PeriodicTransferList extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {

    }


    onItemClick(periodicTransfer: PeriodicPayment) {
        if (this.props.onItemClick)
            this.props.onItemClick(periodicTransfer)
    }

    

    render() {
        return (
            <div className="periodic-transfer-list">
                <Panel className="dark">
                    {this.props.list.map((periodicTransfer, i) => 
                        <div 
                            key={i}
                            className={`periodic-transfer ${this.isItemSelected(periodicTransfer) ? 'active' : ''}`}
                            onClick={() => this.onItemClick(periodicTransfer)}
                        >
                            {periodicTransfer.schedule}: {periodicTransfer.amount}
                        </div>
                    )}
                </Panel>
            </div>
        )
    }


    private isItemSelected(periodicTransfer: PeriodicPayment): boolean {
        if (this.props.selectedPeriodicTransfer && this.props.selectedPeriodicTransfer._id === periodicTransfer._id)
            return true
        else
            return false
    }


}

