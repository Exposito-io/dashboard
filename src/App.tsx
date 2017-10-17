import * as React from 'react';
import './App.css';

import 'react-flex-proto/styles/flex.css';
import './assets/styles/react-blur-admin.min.css';
import './assets/styles/main.css';

import { Sidebar } from './layout/components/sidebar'
import { PageTop } from './layout/components/page-top'
import { Alerts } from './components/alerts/alerts'
import Main from './layout/main'

import { ExpositoClient } from 'exposito-client'
import { BitcoinWallet } from 'models'
import config from './config'


class App extends React.Component {

    props

    state = {
        idToken: null, // Token indicating user is logged in
        user: null, // Full user for that logged in user, if exists
    }

    lock

    componentWillMount() {
        if (process.env.AUTH0_PUB_KEY) {
            //this.lock = new Auth0Lock(process.env.AUTH0_PUB_KEY, process.env.AUTH0_DOMAIN);
            this.setState({ idToken: this.getIdToken() }); // Must come after this.lock init
        }

        //eventBus.on('logout', () => this.onLogout());
    }

    componentDidMount() {
        if (!this.state.idToken && process.env.AUTH0_PUB_KEY) {
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
        // TODO
    }

    setUser() {
        if (!this.state.idToken) {
            return null
        }

        return this.lock.getProfile(this.state.idToken, (err, user) => {
            return err ? this.onLogout() : this.setState({ user })
        });
    }

    getIdToken() {
        let idToken = localStorage.getItem('userToken');
        const authHash = this.lock.parseHash(window.location.hash)
        if (!idToken && authHash) {
            if (authHash.id_token) {
                idToken = authHash.id_token
                localStorage.setItem('userToken', authHash.id_token)
            }
            if (authHash.error) {
                return this.onLogout()
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
                <Alerts />
            </main>
        );
    }
}

export default App;
