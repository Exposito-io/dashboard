import * as React from 'react'
import { bind, debounce } from 'lodash-decorators'
import { setRef } from '../../../lib/tools'

import { observer } from 'mobx-react'
import { NewProjectStore } from '../../../stores/new-project-store'

import { SearchResult } from './search-result'



const store = NewProjectStore.getStore()



@observer
export class Searchbar extends React.Component {

    private searchBar: HTMLInputElement

    constructor(props: any) {
        super(props)


    }

    @debounce(500)
    handleSearchQueryChange() {
        if (this.searchBar.value.length > 2) {
            store.search(this.searchBar.value)
        }
    }


    onItemClick(event) {

    }


    render() {
        return (
            <div>
                <input
                    ref={setRef(this, 'searchBar')}
                    onChange={e => this.handleSearchQueryChange()}
                    className="fs-anim-lower"
                    type="text"
                    placeholder="Add a Github repo or an Exposito user"
                />
                <div className="search-results">
                    {
                        store.searchResults.map(result => {
                            return <SearchResult key={result.id} onClick={this.onItemClick} result={result}>
                            </SearchResult>
                        })
                    }
                </div>
            </div>
        )
    }

}


