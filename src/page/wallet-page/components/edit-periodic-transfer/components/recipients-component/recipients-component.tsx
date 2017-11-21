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

    @bind renderSuggestion(suggestion) {
        switch(suggestion.searchItemType) {
            case 'GithubRepo': return <GithubRepoSuggestion suggestion={suggestion} />
            case 'ExpositoProject': return <ExpositoProjectSuggestion suggestion={suggestion} />
            case 'ExpositoUser': return <UserSuggestion suggestion={suggestion} />
            default: return <div></div>
        }
    }



    @bind onQueryChange(e) {
        this.store.searchQuery = (e.target as any).value
        this.store.fetchSearchSuggestions()
    }
    

    render() {
        return (
            <div className="recipients-component">
                <Autosuggest
                    suggestions={(this.store.searchSuggestions as any).toJS()}
                    onSuggestionsFetchRequested={e => e}
                    onSuggestionsClearRequested={() => this.store.searchSuggestions = []}
                    getSuggestionValue={s => s.score}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={{ 
                        className: 'input',
                        value: this.store.searchQuery, 
                        placeholder: 'Add a recipient', 
                        onChange: this.onQueryChange
                    }}
                />
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
    </div>
)

const UserSuggestion = ({ suggestion }) => (
    <div className="suggestion user">
        <i style={{ backgroundImage: `url('${suggestion.image}')`}}></i>
        <div className="desc">{suggestion.name}</div>
    </div>
)