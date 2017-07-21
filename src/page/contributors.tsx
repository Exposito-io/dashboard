import * as React from 'react'

import { Page, Panel, Breadcrumbs } from 'react-blur-admin'
import { Link } from 'react-router-dom'

export class Contributors extends React.Component {

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>

      </Breadcrumbs>
    )
  }

  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title='Contributors'>
        <Panel title='The Team'>
          Lorem Ipsum
        </Panel>
      </Page>
    );
  }
}
