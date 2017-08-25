import * as React from 'react'
//import '../assets/styles/test.css' 
import { observer } from 'mobx-react'

//import { NewProjectStore } from '../stores/new-project-store'


//let store = NewProjectStore.getStore()

/*
setTimeout(() => { 
  store.search('mathew')
}, 5000)*/

//;(window as any).store = store

@observer
export class TestPage extends React.Component {
  static propTypes = {

  }

  state = {
  }


  render() {
    return (
    <div>
      {
        //store.searchResults.map(result => <div key={result.id}>{result.name}</div>)
      }
    </div>
    )
  }
}

