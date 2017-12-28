import * as React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { bind } from 'bind-decorator'
import * as c from 'classnames'
import * as Autosuggest from 'react-autosuggest'
import * as NumberFormat from 'react-number-format'
import Select from 'react-select'

import { EditPeriodicTransferStore, RepeatPeriod, WeekDay } from '../../stores/edit-periodic-transfer-store'
import { PeriodicPayment } from 'models'

import { Panel } from '../../../../components/panel/panel'
import RepeatChoice from './components/repeat-choice/repeat-choice'
import WeekdayChoice from './components/weekday-choice/weekday-choice'
import { RecipientsComponent } from './components/recipients-component/recipients-component'

import 'react-select/dist/react-select.css'
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
        ;(window as any).editStore = this
    }

    componentDidMount() {
    }

    

    render() {
        return (
            <div className={c('edit-periodic-transfer', { 'expand': this.store.weekdays.length > 0 })}>
                {this.periodicTransfer && 
                    <Panel className="dark">
                        <div className="options">
                            <h3><i>1</i> Description and amount</h3>
                            <input 
                                onChange={e => this.periodicTransfer.description = e.currentTarget.value}
                                value={this.periodicTransfer.description}
                                type="text" 
                                placeholder="Enter a description" 
                                className="description"
                            />
                            <br />
                            <NumberFormat 
                                value={this.store.editedPeriodicTransfer.amount} 
                                className="amount"
                                displayType={'input'} 
                                placeholder="Transfer Amount"
                                prefix={this.store.amountPrefix}
                                suffix={this.store.amountSuffix}
                                thousandSeparator={true} 
                                onChange={(e, values) => this.store.editedPeriodicTransfer.amount = values.amount}
                            />
                            
                            <Select
                                className="amount-currency"  
                                value={this.store.editedPeriodicTransfer.currency}
                                onChange={option => this.store.setAmountType((option as any).value)}
                                options={[
                                    { label: 'US Dollar', value: 'USD' },
                                    { label: 'Percentage', value: 'PCT' },
                                    { label: 'Bitcoin', value: 'BTC' },
                                    { label: 'Ether', value: 'ETH' }
                                ]} 
                                clearable={false}
                                searchable={false} 
                                                             
                            />

                            <br/> <br/><br />

                            <h3><i>2</i> Transfer frequency</h3>
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
                            <h3><i>3</i> Recipients</h3>
                            <RecipientsComponent store={this.store} />
                        </div>
                    </Panel>
                }
            </div>
        )
    }


}

