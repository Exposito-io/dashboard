import * as React from 'react';
import './App.css';

import 'react-flex-proto/styles/flex.css';
import './assets/styles/react-blur-admin.min.css';

import { Sidebar } from './layout/components/sidebar'
import { PageTop } from './layout/components/page-top'
import { Notifications } from 'react-blur-admin'
import Main from './layout/main'

import { ExpositoClient } from 'exposito-client'
import { BitcoinWallet } from 'models'

//import { ExpositoError, ErrorCode } from 'module-test'

//const logo = require('./logo.svg');

//document.domain = 'localhost'

setTimeout(async () => {
    let client = new ExpositoClient({ 
      url: 'http://localhost:3004', 
      version: 'v0', 
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1OTEyNzlhMjNiMTRkOTNiZGJlZDhhNjEiLCJpYXQiOjE0OTg5NjI3ODksImV4cCI6MTUzMDQ5ODc4OX0.5JIIUnRjmLLnfFcuz2Hx4jT4_U1lCYzrDLcffwHSx_A' 
    })
    
    let wallets = await client.wallets.getWallets()
    console.log('wallets: ')
    console.log(wallets)

}, 10000)

class App extends React.Component {

  props

  static propTypes = {
    //router: React.PropTypes.object.isRequired,
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
      <main className="">
        <Sidebar {...this.props} />
        <PageTop user={this.state.user} />
        <div className="al-main">
            <div className="al-content">
              <Main />
            </div>

        
        </div>
        <Notifications />
      </main>
    );
  }
}

export default App;
