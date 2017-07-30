import * as React from 'react'

import { Page, Panel, Breadcrumbs } from 'react-blur-admin'
import { Link } from 'react-router-dom'
import { ImageRadioButton } from '../../components/image-radio-button'

import './main.css'

export class NewProject extends React.Component {

  isAnimating: boolean = false
  isLastStep: boolean = false
  currentEntryIndex: number = 0
  fieldsList: HTMLElement
  projectNameInput
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
    this.projectNameInput.focus()
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>

      </Breadcrumbs>
    )
  }


  prevEntry = () => {
    if (this.isAnimating)
      return

    this.isAnimating = true

    let prevEntry = this.getPrevEntry()

    this.fieldsList.classList.add('fs-display-prev')
    this.currentEntry.classList.remove('fs-current')
    this.currentEntry.classList.add('fs-hide')

    prevEntry.classList.add('fs-current')
    prevEntry.classList.add('fs-show')


    setTimeout(() => {
      this.fieldsList.classList.remove('fs-display-prev')
      this.currentEntry.classList.remove('fs-hide')
      prevEntry.classList.remove('fs-show')

      this.currentEntryIndex = (this.currentEntryIndex - 1 + this.entries.length) % this.entries.length
      this.isAnimating = false
    }, 700)
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


  getPrevEntry() {
    let length = this.entries.length
    return this.entries[(this.currentEntryIndex - 1 + length) % length]
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
                <input ref={input => this.projectNameInput = input} className="fs-anim-lower" type="text" placeholder="My new app" />
              </div>

              <div className="entry">
                <h2 className="fs-anim-upper">Select a cloud provider</h2>
                <div className="fs-anim-lower">
                  <ImageRadioButton inputId="aws" img={require('./images/aws.png')}></ImageRadioButton>
                  <ImageRadioButton inputId="gcloud" img={require('./images/gcloud-white.png')}></ImageRadioButton>
                  <ImageRadioButton 
                    inputId="digital-ocean" 
                    img={require('./images/digital-ocean.png')}>
                  </ImageRadioButton>
                </div>
              </div>     

              <div className="entry">
                <h2 className="fs-anim-upper">Select your project's equity</h2>
                <input className="fs-anim-lower" type="text" placeholder="Add a Github repo or an Exposito user" />
              </div>                          
            </div>

            <button className="prev-btn btn btn-default btn-md" onClick={this.prevEntry}>Previous</button>            
            <button className="next-btn btn btn-default btn-md" onClick={this.nextEntry}>Next</button>            
        </div>
      </Page>
    );
  }
}
