import * as React from 'react'

import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { bind } from 'bind-decorator'


import { PeriodicPayment, FixedPayment, Money, Currencies } from 'models'
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

    getIcon(periodicTransfer: PeriodicPayment) {
        return require('../../images/periodic-transfers/week.svg')
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
                            <img className="period-icon" src={this.getIcon(periodicTransfer)} alt=""/>
                            <span className="description">
                                {periodicTransfer.description}
                            </span> 
                            <span className="amount">
                                <span className="currency">{this.getAmountCurrency(periodicTransfer.currency)}</span>
                                {periodicTransfer.amount}
                            </span>
                        </div>
                    )}
                </Panel>
            </div>
        )
    }

    private getAmountCurrency(currency: string) {
        return Currencies[currency].symbol_native
    }

    private isItemSelected(periodicTransfer: PeriodicPayment): boolean {
        if (this.props.selectedPeriodicTransfer && this.props.selectedPeriodicTransfer._id === periodicTransfer._id)
            return true
        else
            return false
    }


}

