import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './assets/styles/easing.css'
import './index.css';
import { Login } from './layout/login'
import { TestPage } from './layout/test'



import * as injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/test' component={TestPage}/>
      <Route path='*' component={App}/> 
    </Switch>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker()
