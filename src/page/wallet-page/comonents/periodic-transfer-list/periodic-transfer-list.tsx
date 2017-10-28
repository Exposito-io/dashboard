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
                    {this.props.list.map((periodicPayment, i) => 
                        <div className="periodic-transfer" onClick={() => this.onItemClick(periodicPayment)}>
                            {periodicPayment.schedule}: {periodicPayment.amount}
                        </div>
                    )}
                </Panel>
            </div>
        )
    }


}

