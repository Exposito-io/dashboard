import * as React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { bind } from 'bind-decorator'
import * as c from 'classnames'

import { EditPeriodicTransferStore, RepeatPeriod, WeekDay } from '../../stores/edit-periodic-transfer-store'
import { PeriodicPayment } from 'models'
import RepeatChoice from './components/repeat-choice/repeat-choice'
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
                                <div 
                                    className={c(
                                        'week-day',
                                      { 'active': this.store.weekdays.includes(WeekDay.Sunday)}  
                                    )}
                                    onClick={() => this.store.toggleWeekday(WeekDay.Sunday)}
                                >
                                    Sun
                                </div>
                                <div 
                                    className={c(
                                        'week-day',
                                      { 'active': this.store.weekdays.includes(WeekDay.Monday)}  
                                    )}
                                    onClick={() => this.store.toggleWeekday(WeekDay.Monday)}
                                >
                                    Mon
                                </div>
                                <div 
                                    className={c(
                                        'week-day',
                                      { 'active': this.store.weekdays.includes(WeekDay.Tuesday)}  
                                    )}
                                    onClick={() => this.store.toggleWeekday(WeekDay.Tuesday)}
                                >
                                    Tue
                                </div>
                                <div 
                                    className={c(
                                        'week-day',
                                      { 'active': this.store.weekdays.includes(WeekDay.Wednesday)}  
                                    )}
                                    onClick={() => this.store.toggleWeekday(WeekDay.Wednesday)}
                                >Wed</div>
                                <div 
                                    className={c(
                                        'week-day',
                                      { 'active': this.store.weekdays.includes(WeekDay.Thursday)}  
                                    )}
                                    onClick={() => this.store.toggleWeekday(WeekDay.Thursday)}
                                >Thu</div>
                                <div 
                                    className={c(
                                        'week-day',
                                      { 'active': this.store.weekdays.includes(WeekDay.Friday)}  
                                    )}
                                    onClick={() => this.store.toggleWeekday(WeekDay.Friday)}
                                >Fri</div>
                                <div 
                                    className={c(
                                        'week-day',
                                      { 'active': this.store.weekdays.includes(WeekDay.Saturday)}  
                                    )}
                                    onClick={() => this.store.toggleWeekday(WeekDay.Saturday)}
                                >Sat</div>
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

