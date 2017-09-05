import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Dashboard } from '../page/dashboard'
import { Instances } from '../page/instances'
import { Wallets } from '../page/wallets'
import { PeriodicPayments } from '../page/periodic-payments'
import { Contributors } from '../page/contributors'
import { NewProject } from '../page/new-project'
import { NotFound } from '../page/not-found'


const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Dashboard}/>
      <Route exact path="/instances" component={Instances}/>
      <Route exact path="/wallets" component={Wallets}/>
      <Route exact path="/periodic-payments" component={PeriodicPayments}/>
      <Route exact path="/contributors" component={Contributors}/>
      <Route exact path="/new-project" component={NewProject}/>
      <Route path="*" component={NotFound}/>
      
    </Switch>
  </main>
)

export default Main