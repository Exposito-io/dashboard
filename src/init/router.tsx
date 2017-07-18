import * as React from 'react';
//import { Router, Route, Redirect, browserHistory } from 'react-router';
import { BrowserRouter, Redirect, Route } from 'react-router-dom'

import AppLayout from '../layout/app';
import { Login } from '../layout/login';

/* Demos */
import { Welcome } from '../page/welcome';
import { About } from '../page/about';
import { ProgressBars } from '../page/progress-bars';
import { TableDemo } from '../page/table-demo';
import { ButtonDemo } from '../page/button-demo';
import { ModalDemo } from '../page/modal-demo';
import { TabsDemo } from '../page/tabs-demo';
import { InputDemo } from '../page/input-demo';
import { NotificationsDemo } from '../page/notifications-demo';
/* End Demos */

import { NotFound } from '../page/not-found';

// Redirect is got GH pages and can be deleted for forked projects
const redirect = <Redirect from="/react-webpack-skeleton" to="/" />;

/*
export const AppRouter = (
  <BrowserRouter history={browserHistory}>
    {redirect}
    <Route path='/login' component={Login} />
    <Route component={AppLayout}>
      <Route path='/' component={Welcome} />
      <Route path='/about' component={About} />
      <Route path='/progress-bars' component={ProgressBars} />
      <Route path='/button-demo' component={ButtonDemo} />
      <Route path='/modal-demo' component={ModalDemo} />
      <Route path='/table-demo' component={TableDemo} />
      <Route path='/tabs-demo' component={TabsDemo} />
      <Route path='/input-demo' component={InputDemo} />
      <Route path='/notifications-demo' component={NotificationsDemo} />
      <Route path="*" component={NotFound}/>
    </Route>
  </BrowserRouter>
);*/
