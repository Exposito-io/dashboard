import * as React from 'react'

import { Page, Panel, Breadcrumbs } from 'react-blur-admin'
import { Link } from 'react-router-dom'

import './main.css'

export class NewProject extends React.Component {

  isAnimating: boolean = false
  isLastStep: boolean = false
  currentEntry: HTMLElement
  fieldsList: HTMLElement

  constructor(props: any) {
    super(props)

    //setTimeout(() => this.init(), 1000)

    setTimeout(() => this.nextEntry(), 2000)
  }

  componentDidMount() {
    this.currentEntry = document.getElementById('entry1')
    this.fieldsList = document.getElementById('field-list')   
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>

      </Breadcrumbs>
    )
  }

  nextEntry() {
    this.fieldsList.classList.add('fs-display-next')
    this.currentEntry.classList.add('fs-hide')
  }

  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title='New Project'>
        <Panel title='Create a new project'>
          Lorem Ipsum
        </Panel>

        <div className="new-project fs-form">
            <h2 className="main-title">New project</h2>

            <div className="form fs-fields" id="field-list">
              <div className="entry" id="entry1">
                <h2 className="fs-anim-upper">Select a project name</h2>
                <input className="fs-anim-lower" type="text" placeholder="My new app" />
              </div>
            </div>
        </div>
      </Page>
    );
  }
}
