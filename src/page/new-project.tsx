import * as React from 'react'

import { Page, Panel, Breadcrumbs } from 'react-blur-admin'
import { Link } from 'react-router-dom'

export class NewProject extends React.Component {

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>

      </Breadcrumbs>
    )
  }

  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title='New Project'>
        <Panel title='Create a new project'>
          Lorem Ipsum
        </Panel>
      </Page>
    );
  }
}
