import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Welcome } from '../page/welcome'
import { About } from '../page/about'
import { TableDemo } from '../page/table-demo'
import { ButtonDemo } from '../page/button-demo'
import { ProgressBars } from '../page/progress-bars'
import { ModalDemo } from '../page/modal-demo'
import { TabsDemo } from '../page/tabs-demo'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Welcome}/>
      <Route exact path='/about' component={About}/>
      <Route exact path='/table-demo' component={TableDemo}/>
      <Route exact path='/button-demo' component={ButtonDemo}/>
      <Route exact path='/progress-bars' component={ProgressBars}/>
      <Route exact path='/modal-demo' component={ModalDemo}/>
      <Route exact path='/tabs-demo' component={TabsDemo}/>
    </Switch>
  </main>
)

export default Main