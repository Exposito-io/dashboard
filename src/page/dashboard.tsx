import * as React from 'react'
import { autorun, observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import { Page, Panel, Breadcrumbs } from 'react-blur-admin'
import { Link } from 'react-router-dom'
import { WalletStore } from '../stores/wallet-store'



/*
setInterval(() => {
  observableTodoStore.addTodo('read MobX tutorial');
}, 5000)*/

@observer
export class Dashboard extends React.Component {

  private walletStore: WalletStore

  constructor() {
    super()
    setTimeout(() => this.walletStore = WalletStore.getStore(), 5000)
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to="/">
          Home
        </Link>
          Home
      </Breadcrumbs>
    )
  }

  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title="Home">
        <Panel title="The Team">
          Lorem Ipsum
        </Panel>
      </Page>
    );
  }
}
