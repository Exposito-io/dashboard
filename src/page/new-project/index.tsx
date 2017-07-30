import * as React from 'react'

import { Page, Panel, Breadcrumbs } from 'react-blur-admin'
import { Link } from 'react-router-dom'

import './main.css'

export class NewProject extends React.Component {

  isAnimating: boolean = false
  isLastStep: boolean = false
  currentEntryIndex: number = 0
  fieldsList: HTMLElement
  entries: Element[]
  get currentEntry(): Element { return this.entries[this.currentEntryIndex]}

  constructor(props: any) {
    super(props)

    //setTimeout(() => this.init(), 1000)

    //setTimeout(() => this.nextEntry(), 2000)
  }

  componentDidMount() {
    this.fieldsList = document.getElementById('field-list')   
    this.entries = Array.from(this.fieldsList.getElementsByClassName('entry'))
    this.currentEntry.classList.add('fs-current')
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>

      </Breadcrumbs>
    )
  }

  nextEntry = () => {
    if (this.isAnimating)
      return

    this.isAnimating = true

    let nextEntry = this.getNextEntry()

    this.fieldsList.classList.add('fs-display-next')
    this.currentEntry.classList.remove('fs-current')
    this.currentEntry.classList.add('fs-hide')

    nextEntry.classList.add('fs-current')
    nextEntry.classList.add('fs-show')


    setTimeout(() => {
      this.fieldsList.classList.remove('fs-display-next')
      this.currentEntry.classList.remove('fs-hide')
      nextEntry.classList.remove('fs-show')

      this.currentEntryIndex = (this.currentEntryIndex + 1) % this.entries.length
      this.isAnimating = false
    }, 700)
  }



  getNextEntry() {
    let length = this.entries.length
    return this.entries[(this.currentEntryIndex + 1) % length]
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
              <div className="entry">
                <h2 className="fs-anim-upper">Select a project name</h2>
                <input className="fs-anim-lower" type="text" placeholder="My new app" />
              </div>
              <div className="entry">
                <h2 className="fs-anim-upper">Select a cloud provider</h2>
                <input className="fs-anim-lower" type="text" placeholder="My new app" />
              </div>              
            </div>

            <button className="next-btn btn btn-default btn-md" onClick={this.nextEntry}>Next</button>            
        </div>
      </Page>
    );
  }
}
