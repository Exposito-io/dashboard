import * as React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { bind } from 'bind-decorator'

import { EditPeriodicTransferStore, RepeatPeriod } from '../../stores/edit-periodic-transfer-store'
import { PeriodicPayment } from 'models'
import { Panel } from '../../../../components/panel/panel'


import './edit-periodic-transfer.css'


type Props = {
    periodicTransfer: PeriodicPayment
    store: EditPeriodicTransferStore
}

@observer
export default class EditPeriodicTransfer extends React.Component<Props, {}> {

    get periodicTransfer() { return this.props.store.editedPeriodicTransfer }
    get store() { return this.props.store }

    constructor(props: Props) {
        super(props)
    }

    componentDidMount() {
    }

    

    render() {
        return (
            <div className="edit-periodic-transfer">
                <Panel className="dark">
                    {this.periodicTransfer && 
                        <div>
                            <input 
                                onChange={e => this.periodicTransfer.description = e.currentTarget.value}
                                value={this.periodicTransfer.description}
                                type="text" 
                                placeholder="Enter a description" 
                                className="description"
                            />

                            <div className="repeat-choices">
                                <div className="repeat-btn">
                                    <img src={require('./images/hourly.svg')} alt=""/>
                                    <span>Repeat hourly</span>
                                </div>                                
                                <div className="repeat-btn">
                                    <img src={require('./images/day.svg')} alt=""/>
                                    <span>Repeat daily</span>
                                </div>
                                <div className="repeat-btn">
                                    <img src={require('./images/week.svg')} alt="" />
                                    <span>Repeat weekly</span>
                                </div>  
                                <div className="repeat-btn">
                                    <img src={require('./images/month.svg')} alt=""/>
                                    <span>Repeat monthly</span>
                                </div>  
                                <div className="repeat-btn">
                                    <img src={require('./images/year.svg')} alt=""/>
                                    <span>Repeat yearly</span>
                                </div>
                            </div>

                            {
                            <div className="days-container">

                            </div>
                            }

                        </div>
                    }
                </Panel>
            </div>
        )
    }


}

