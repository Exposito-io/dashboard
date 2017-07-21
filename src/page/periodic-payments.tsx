import * as React from 'react'

import { Page, Panel, Breadcrumbs } from 'react-blur-admin'
import { Link } from 'react-router-dom'

export class PeriodicPayments extends React.Component {

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to='/'>
          Home
        </Link>
          Periodic Payments
      </Breadcrumbs>
    )
  }

  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title='Periodic Payments'>
        <Panel title='The Team'>
          Lorem Ipsum
        </Panel>
      </Page>
    );
  }
}
