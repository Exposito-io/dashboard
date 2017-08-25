import * as React from 'react'
import { bind, debounce } from 'lodash-decorators'
import { setRef } from '../../../lib/tools'

import { observer } from 'mobx-react'
import { NewProjectStore } from '../new-project-store'

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


    @bind
    onSearchResultClick(searchResult) {
        store.addShareholder(searchResult)
        console.log('search result clicked', searchResult)
    }


    render() {
        return (
            <div>
                <input
                    id="searchbar"
                    ref={setRef(this, 'searchBar')}
                    onChange={e => this.handleSearchQueryChange()}
                    className="fs-anim-lower"
                    type="text"
                    placeholder="Add a Github repo or an Exposito user"
                />
                <div className="search-results">
                    {
                        store.searchResults.map(result => {
                            return <SearchResult 
                                        key={result.id} 
                                        onClick={this.onSearchResultClick} 
                                        result={result}>
                                   </SearchResult>
                        })
                    }
                </div>
            </div>
        )
    }

}


