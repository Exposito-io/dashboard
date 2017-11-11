import * as React from 'react'
import * as c from 'classnames'
import { observer } from 'mobx-react'

import { WeekDay, EditPeriodicTransferStore } from '../../../../stores/edit-periodic-transfer-store'

import './weekday-choice.css'

class Props {
    store: EditPeriodicTransferStore
    weekday?: WeekDay = WeekDay.Sunday
}

@observer
export default class WeekdayChoice extends React.Component<Props, {}> {   

    get store() { return this.props.store }
    get weekday() { return this.props.weekday }

    get label() {
        switch (this.props.weekday) {
            case WeekDay.Sunday: return 'Sun'
            case WeekDay.Monday: return 'Mon'
            case WeekDay.Tuesday: return 'Tue'
            case WeekDay.Wednesday: return 'Wed'
            case WeekDay.Thursday: return 'Thu'
            case WeekDay.Friday: return 'Fri'
            case WeekDay.Saturday: return 'Sat'
            default: return ''
        }
    }


    render() {
        return (
            <div 
                className={c(
                    'week-day',
                  { 'active': this.store.weekdays.includes(this.weekday)}  
                )}
                onClick={() => this.store.toggleWeekday(this.weekday)}
            >
                {this.label}
            </div>
        )
    }



}