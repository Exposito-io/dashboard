import * as React from 'react'

import { bind } from 'bind-decorator'
import { Page, Panel, Breadcrumbs } from 'react-blur-admin'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { ImageRadioButton } from '../../components/image-radio-button'
import { setRef } from '../../lib/tools'
import { LayoutStore } from './layout-store'
import { NewProjectStore } from './new-project-store'
import { Searchbar } from './components/searchbar'
import { Shareholders } from './components/shareholders'

import './main.css'


const layoutStore = new LayoutStore()
const store = NewProjectStore.getStore()



@observer
export class NewProject extends React.Component {

  isAnimating: boolean = false
  isLastStep: boolean = false
  fieldsList: HTMLElement
  projectNameInput: HTMLInputElement
  projectDescInput: HTMLTextAreaElement
  entries: Element[]
  get currentEntry(): Element { return this.entries[layoutStore.currentEntryIndex]}

  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
    this.entries = Array.from(this.fieldsList.getElementsByClassName('entry'))
    this.currentEntry.classList.add('fs-current')
    //this.projectNameInput.focus()
    layoutStore.entryCount = this.entries.length
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

      layoutStore.prevEntry()
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

      layoutStore.nextEntry()
      this.isAnimating = false
    }, 700)
  }


  getPrevEntry() {
    let length = this.entries.length
    return this.entries[(layoutStore.currentEntryIndex - 1 + length) % length]
  }

  getNextEntry() {
    let length = this.entries.length
    return this.entries[(layoutStore.currentEntryIndex + 1) % length]
  }



  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title='New Project'>
        <Panel title='Create a new project'>
          Lorem Ipsum
        </Panel>

        <div className="new-project fs-form">
            <h2 className="main-title">New project</h2>
            
            <div className="form fs-fields" ref={setRef(this, 'fieldsList')}>
              
              {/**/}
              <div className="entry project-description">
                <h2 className="fs-anim-upper">Enter your project info</h2>
                <input 
                  ref={setRef(this, 'projectNameInput')} 
                  className="fs-anim-lower" 
                  type="text" 
                  placeholder="Project name" 
                />
                <br />
                <textarea 
                  onKeyDown={this.autoResize}
                  ref={setRef(this, 'projectDescInput')} 
                  className="project-desc fs-anim-lower" 
                  placeholder="Project description" 
                >                
                </textarea>
              </div>
              {/**/}
              {/*
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
              </div> */}    
              
              <div className="entry">
                <h2 className="fs-anim-upper">Customize your project's equity</h2>
                <Searchbar></Searchbar>
                <Shareholders></Shareholders>
              </div>                          
            </div>

            <button 
              className={`prev-btn btn btn-default btn-md ${layoutStore.isFirstEntry ? 'hidden' : ''}`} 
              onClick={this.prevEntry}>
              Previous
            </button>            
            <button 
              className={`next-btn btn btn-default btn-md ${layoutStore.isLastEntry ? 'hidden' : ''}`}
              onClick={this.nextEntry}>
              Next
            </button>            
            <button 
              className={`next-btn btn btn-default btn-md ${!layoutStore.isLastEntry ? 'hidden' : ''}`}
              onClick={this.nextEntry}>
              Create Project
            </button>                        
        </div>
      </Page>
    )
  }


  @bind private autoResize() {
      setTimeout(() => {
        let height = this.projectDescInput.scrollHeight

        this.projectDescInput.style.cssText = 'height:auto;'
        this.projectDescInput.style.cssText = `height: ${height}px`
      })  

  }
}
