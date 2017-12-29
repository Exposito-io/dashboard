import * as React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { bind } from 'bind-decorator'
import * as c from 'classnames'
import * as Autosuggest from 'react-autosuggest'
import Toggle from 'react-toggle'


import { EditPeriodicTransferStore, RepeatPeriod, WeekDay } from '../../../../stores/edit-periodic-transfer-store'
import { PeriodicPayment } from 'models'

import { TransferRecipients } from '../../../../../../components/transfer-recipients/transfer-recipients'



import 'react-toggle/style.css'
import './recipients-component.css'


type Props = {
    store: EditPeriodicTransferStore
}




@observer
export class RecipientsComponent extends React.Component<Props, {}> {

    get store() { return this.props.store }


    componentDidMount() {
    }

    @bind renderSuggestion(suggestion) {
        switch(suggestion.searchItemType) {
            case 'GithubRepo': return <GithubRepoSuggestion suggestion={suggestion} />
            case 'ExpositoProject': return <ExpositoProjectSuggestion suggestion={suggestion} />
            case 'ExpositoUser': return <UserSuggestion suggestion={suggestion} />
            default: return <div></div>
        }
    }

    renderRecipient(suggestion) {
        switch(suggestion.searchItemType) {
            case 'GithubRepo': return <GithubRepoSuggestion suggestion={suggestion} />
            case 'ExpositoProject': return <ExpositoProjectSuggestion suggestion={suggestion} />
            case 'ExpositoUser': return <UserSuggestion suggestion={suggestion} />
            default: return <div></div>
        }
    }    



    @bind onQueryChange(e) {
        this.store.searchQuery = (e.target as any).value || ''

        this.store.fetchSearchSuggestions()
    }
    

    render() {
        return (
            <div className="recipients-component">
                <Autosuggest
                    suggestions={(this.store.searchSuggestions as any).toJS()}
                    onSuggestionsFetchRequested={e => e}
                    onSuggestionsClearRequested={() => this.store.searchSuggestions = []}
                    onSuggestionSelected={(e,value) => this.store.addRecipient(value.suggestion)}
                    onSuggestionHighlighted={() => ''}
                    getSuggestionValue={s => s.name}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={{ 
                        className: 'input',
                        value: this.store.searchQuery, 
                        placeholder: 'Add a recipient', 
                        onChange: this.onQueryChange
                    }}
                />

                <div className="recipients">
                    <TransferRecipients 
                        amount={this.store.calculatedAmount} 
                        approximativeAmount={this.store.approximativeAmount}
                        destinations={this.store.editedPeriodicTransfer.destination} 
                    />
                </div>
            </div>
        )
    }
}


const GithubRepoSuggestion = ({ suggestion }) => (
    <div className="suggestion github-repo">
        <i></i>
        <div className="desc">
            {suggestion.owner.login} / {suggestion.name}
        </div>
    </div>
)

const ExpositoProjectSuggestion = ({ suggestion }) => (
    <div className="suggestion exposito-project">
        <i></i>
        <div className="desc">
            {suggestion.name}
        </div>
        <div className="tokenholders">
            {suggestion.latestTokenholdersSnapshot.tokenholders.map((tokenholder, i) => 
                <div 
                    key={i}
                    className="tokenholder"
                    style={{ backgroundImage: `url(${tokenholder.picture})` }}>
                </div>
            )}
        </div>
    </div>
)

const UserSuggestion = ({ suggestion }) => (
    <div className="suggestion user">
        <i style={{ backgroundImage: `url('${suggestion.image}')`}}></i>
        <div className="desc">{suggestion.name}</div>
    </div>
)