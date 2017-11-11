import * as React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { bind } from 'bind-decorator'
import * as c from 'classnames'

import { EditPeriodicTransferStore, RepeatPeriod, WeekDay } from '../../stores/edit-periodic-transfer-store'
import { PeriodicPayment } from 'models'

import { Panel } from '../../../../components/panel/panel'
import RepeatChoice from './components/repeat-choice/repeat-choice'
import WeekdayChoice from './components/weekday-choice/weekday-choice'

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
                {this.periodicTransfer && 
                    <Panel className="dark">
                        <div className="options">
                            <h3><i>1</i> General options</h3>
                            <input 
                                onChange={e => this.periodicTransfer.description = e.currentTarget.value}
                                value={this.periodicTransfer.description}
                                type="text" 
                                placeholder="Enter a description" 
                                className="description"
                            />

                            <div className="repeat-choices">
                                <RepeatChoice period={RepeatPeriod.Hourly} store={this.store} />
                                <RepeatChoice period={RepeatPeriod.Daily} store={this.store} />
                                <RepeatChoice period={RepeatPeriod.Weekly} store={this.store} />
                                <RepeatChoice period={RepeatPeriod.Monthly} store={this.store} />
                                <RepeatChoice period={RepeatPeriod.Yearly} store={this.store} />
                            </div>

                            <div className={c(
                                'repeat-options',
                                'week-days',
                              { 'visible': this.store.selectedRepeatPeriod === RepeatPeriod.Weekly }
                                )}>
                                
                                <WeekdayChoice store={this.store} weekday={WeekDay.Sunday} />
                                <WeekdayChoice store={this.store} weekday={WeekDay.Monday} />
                                <WeekdayChoice store={this.store} weekday={WeekDay.Tuesday} />
                                <WeekdayChoice store={this.store} weekday={WeekDay.Wednesday} />
                                <WeekdayChoice store={this.store} weekday={WeekDay.Thursday} />
                                <WeekdayChoice store={this.store} weekday={WeekDay.Friday} />
                                <WeekdayChoice store={this.store} weekday={WeekDay.Saturday} />

                            </div>
                           

                        </div>
                        <div className="add-recipients">
                            <h3><i>2</i> Add recipients</h3>
                            <input type="text" placeholder="Add a recipient" style={{width: '100%'}} />
                        </div>
                    </Panel>
                }
            </div>
        )
    }


}

