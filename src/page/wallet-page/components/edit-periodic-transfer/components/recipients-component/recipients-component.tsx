import * as React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { bind } from 'bind-decorator'
import * as c from 'classnames'
import * as Autosuggest from 'react-autosuggest'

import { EditPeriodicTransferStore, RepeatPeriod, WeekDay } from '../../../../stores/edit-periodic-transfer-store'
import { PeriodicPayment } from 'models'



import './recipients-component.css'


type Props = {
    store: EditPeriodicTransferStore
}


@observer
export class RecipientsComponent extends React.Component<Props, {}> {

    get store() { return this.props.store }


    componentDidMount() {
    }

    

    render() {
        return (
            <div className="recipients-component">
                <Autosuggest
                    suggestions={[]}
                    onSuggestionsFetchRequested={() => {}}
                    onSuggestionsClearRequested={() => {}}
                    getSuggestionValue={s => s}
                    renderSuggestion={() => <div></div>}
                    inputProps={{ 
                        className: 'input',
                        value: '', 
                        placeholder: 'Add a recipient', 
                        onChange: () => {}
                    }}
                />
            </div>
        )
    }
}