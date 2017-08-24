import * as React from 'react'
import { debounce } from 'lodash'

import { observer } from 'mobx-react'
import { NewProjectStore } from '../../../../stores/new-project-store'



const store = NewProjectStore.getStore()



@observer
export class Searchbar extends React.Component {


  constructor(props: any) {
    super(props)


  }


  handleSearchQueryChange(event) {
    if (event.target.value.length > 2) {
      debounce(() => store.search(event.target.value), 250)
    }
  }  


  onItemClick(event) {
    
  }


  render() {
      return (
        <div>
            <input onChange={value => this.handleSearchQueryChange} className="fs-anim-lower" type="text" placeholder="Add a Github repo or an Exposito user" />
            <ul className="search-results">
                {
                store.searchResults.map(result => {
                    return <li key={result.id} onClick={this.onItemClick}>
                            {result.name}
                            </li>
                })
                }
            </ul>     
        </div>       
      )
  }

}