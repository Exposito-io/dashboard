import * as React from 'react';
import './App.css';

import 'react-flex-proto/styles/flex.css';
import 'react-blur-admin/dist/assets/styles/react-blur-admin.min.css';

import { Sidebar } from './layout/components/sidebar'
import { PageTop } from './layout/components/page-top'
import { Welcome } from './page/welcome'

const logo = require('./logo.svg');

class App extends React.Component {
  static propTypes = {
    router: React.PropTypes.object.isRequired,
    location: React.PropTypes.shape({
      pathname: React.PropTypes.string.isRequired,
      query: React.PropTypes.object.isRequired,
    }),
  }

  state = {
    idToken: null, // Token indicating user is logged in
    user: null, // Full user for that logged in user, if exists
  }

  lock: any

  componentWillMount() {
    if (process.env.AUTH0_PUB_KEY) {
      //this.lock = new Auth0Lock(process.env.AUTH0_PUB_KEY, process.env.AUTH0_DOMAIN);
      this.setState({idToken: this.getIdToken()}); // Must come after this.lock init
    }

    //eventBus.on('logout', () => this.onLogout());
  }

  componentDidMount() {
    if (! this.state.idToken && process.env.AUTH0_PUB_KEY) {
      return this.redirectToLogin();
    }
    return this.setUser();
  }

  onLogout() {
    localStorage.removeItem('userToken');
    this.setState({ idToken: null, user: null });
    return this.redirectToLogin();
  }

  redirectToLogin() {
    this.props.router.push({
      pathname: '/login',
      query: { redirectUri: encodeURIComponent(this.props.location.pathname) },
    });
  }

  setUser() {
    if (! this.state.idToken) {
      return null;
    }

    return this.lock.getProfile(this.state.idToken, (err, user) => {
      return err ? this.onLogout() : this.setState({user});
    });
  }

  getIdToken() {
    let idToken = localStorage.getItem('userToken');
    const authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        return this.onLogout();
      }
    }
    return idToken;
  }


  render() {
    return (
      <div className="App">
        <Sidebar {...this.props} />
        <PageTop user={this.state.user} />
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
