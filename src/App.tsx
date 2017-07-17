import * as React from 'react';
import './App.css';

import 'react-flex-proto/styles/flex.css';
import 'react-blur-admin/dist/assets/styles/react-blur-admin.min.css';

import { Sidebar } from './layout/components/sidebar';
import { Welcome } from './page/welcome'

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Sidebar {...this.props} />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Welcome/>
      </div>
    );
  }
}

export default App;
