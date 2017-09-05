import * as React from 'react'
import { autorun, observable, computed, action } from 'mobx'
import { observer } from 'mobx-react'
import { Page, Panel, Breadcrumbs } from 'react-blur-admin'
import { Link } from 'react-router-dom'






@observer
export class SettingsPage extends React.Component {


  constructor() {
    super()
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
