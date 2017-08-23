import * as React from 'react'
import '../assets/styles/test.css' 
import { observer } from 'mobx-react'

import { NewProjectStore } from '../stores/new-project-store'


let store = NewProjectStore.getStore()

setTimeout(() => { 
  store.search('mathew')
}, 5000)


@observer
export class TestPage extends React.Component {
  static propTypes = {

  }

  state = {
  }


  render() {
    return <div>{JSON.stringify(store.searchResults)}</div> 
  }
}

