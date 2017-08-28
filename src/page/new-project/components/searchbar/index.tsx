import * as React from 'react'
import { Panel } from 'react-blur-admin'
import { debounce } from 'lodash-decorators'
import { bind } from 'bind-decorator'
import { setRef } from '../../../../lib/tools'

import { observer } from 'mobx-react'
import { NewProjectStore } from '../../new-project-store'

import { SearchResult } from '../search-result'


import './searchbar.css'



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

    @bind onFocus() {
        store.searchHasFocus = true
    }


    @bind onFocusOut() {
        store.searchHasFocus = false
    }


    @bind onSearchResultClick(searchResult) {
        store.addShareholder(searchResult)
        this.searchBar.value = ''
        console.log('search result clicked', searchResult)
    }

    


    render() {
        return (
            <div className={`new-project-search 
                             ${store.hasSearchResults ? 'has-results' : ''} 
                             ${store.searchHasFocus ? 'has-focus' : ''}`}>
                             
                <div className="search-input-wrap fs-anim-lower">
                    <input
                        ref={setRef(this, 'searchBar')}
                        onChange={e => this.handleSearchQueryChange()}
                        onFocus={this.onFocus}
                        onBlur={this.onFocusOut}
                        className="fs-anim-lower"
                        placeholder="Add a user or a GitHub repository"
                        type="text"
                    />
                </div>
                <Panel className="search-results">
                    {
                        store.searchResults.map(result => {
                            return <SearchResult 
                                        key={result.id} 
                                        onClick={this.onSearchResultClick} 
                                        result={result}>
                                   </SearchResult>
                        })
                    }
                </Panel>
            </div>
        )
    }

}


