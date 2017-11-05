import * as React from 'react'

import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { bind } from 'bind-decorator'


import { PeriodicPayment } from 'models'
import { Panel } from '../../../../components/panel/panel'


import './edit-periodic-transfer.css'


type Props = {
    periodicTransfer: PeriodicPayment
}

@observer
export default class EditPeriodicTransfer extends React.Component<Props, {}> {

    get periodicTransfer() { return this.props.periodicTransfer }

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
                            <input type="text" placeholder="Description" />

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

                        </div>
                    }
                </Panel>
            </div>
        )
    }


}

