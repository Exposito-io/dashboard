import * as React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { bind } from 'bind-decorator'
import * as c from 'classnames'

import { EditPeriodicTransferStore, RepeatPeriod } from '../../../../stores/edit-periodic-transfer-store'
import { PeriodicPayment } from 'models'


import './repeat-choice.css'


type Props = {
    period: RepeatPeriod
    store: EditPeriodicTransferStore
}


@observer
export default class RepeatChoice extends React.Component<Props, {}> {

    get selectedRepeatPeriod() { return this.props.store.selectedRepeatPeriod }
    
    @bind onClick() {
        this.props.store.selectedRepeatPeriod = this.props.period
    }
    
    getIcon() {
        let imgPath = './images'
        switch (this.props.period) {
            case RepeatPeriod.Hourly: return require(`${imgPath}/hourly.svg`)
            case RepeatPeriod.Daily: return require(`${imgPath}/day.svg`)
            case RepeatPeriod.Weekly: return require(`${imgPath}/week.svg`)
            case RepeatPeriod.Monthly: return require(`${imgPath}/month.svg`)
            case RepeatPeriod.Yearly: return require(`${imgPath}/year.svg`)
            default: return require(`${imgPath}/hourly.svg`)
        }
    }

    getText() {
        switch (this.props.period) {
            case RepeatPeriod.Hourly: return 'Repeat hourly'
            case RepeatPeriod.Daily: return 'Repeat daily'
            case RepeatPeriod.Weekly: return 'Repeat weekly'
            case RepeatPeriod.Monthly: return 'Repeat monthly'
            case RepeatPeriod.Yearly: return 'Repeat yearly'
            default: return 'Repeat hourly'
        }
    }    

    render() {
        return (
        <div className={c(
                    "repeat-btn", 
                    { 'active': this.selectedRepeatPeriod === this.props.period}
             )}
             onClick={this.onClick}>
            <img src={this.getIcon()} alt={this.getText()} />
            <span>{this.getText()}</span>
        </div>  
        )
    }

}