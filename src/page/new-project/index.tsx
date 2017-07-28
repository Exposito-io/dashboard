import * as React from 'react'

import { Page, Panel, Breadcrumbs } from 'react-blur-admin'
import { Link } from 'react-router-dom'

import './main.css'

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

        <div className="new-project">
            <h2>New project</h2>

            <div className="form">
              <div className="entry">
                <h2>Select a project name</h2>
                <input type="text" placeholder="My new app" />
              </div>
            </div>
        </div>
      </Page>
    );
  }
}
