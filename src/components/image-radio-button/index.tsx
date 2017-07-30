import * as React from 'react'

import { Page, Panel, Breadcrumbs } from 'react-blur-admin'
import { Link } from 'react-router-dom'

import './image-radio-button.css'

export class ImageRadioButton extends React.Component {

  props

  img: string

  constructor(props: any) {
    super(props)

    //this.img = require('../../page/new-project/images/aws.png')
    
    //this.img = require(this.props.img)
    //setTimeout(() => this.init(), 1000)

    //setTimeout(() => this.nextEntry(), 2000)
  }

  componentDidMount() {

  }



  render() {
    return (
        <div className="image-radio-button">
            <input 
              type="radio" name="emotion" 
              id={this.props.inputId} className="input-hidden" 
            />
            <label htmlFor={this.props.inputId}>
              <img 
                src={this.props.img} 
                alt="I'm sad" />
            </label>
        </div>
    )
  }
}
