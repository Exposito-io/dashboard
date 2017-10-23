import * as React from 'react'

import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { bind } from 'bind-decorator'


import { PeriodicPayment } from 'models'
import { Panel } from '../../../../components/panel/panel'


import './periodic-transfer-list.css'

type Props = {
    list: PeriodicPayment[]
    onItemSelect: (item: PeriodicPayment) => any
}

@observer
export class PeriodicTransferList extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
    }

    

    render() {
        return (
            <div className="periodic-transfer-list">
                <Panel className="dark">
                    
                </Panel>
            </div>
        )
    }


}

