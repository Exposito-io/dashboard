import * as React from 'react'

import './success-icon.css'



export class SuccessIcon extends React.Component<{ className?: string }> {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    setTimeout(() => {
        document.getElementById('success-container').classList.add('show')
    }, 100) 
  }


  render() {
    return (
        <svg className={`checkmark ${this.props.className}`}
             xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 52 52">
             <circle className="checkmark__circle" 
                     cx="26" 
                     cy="26" 
                     r="25" 
                     fill="none"
             />
             <path 
                className="checkmark__check" 
                fill="none" 
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
             />
        </svg>
    )
  }


}
