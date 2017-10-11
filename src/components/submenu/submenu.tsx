import * as React from 'react'

import { bind } from 'bind-decorator'
import { Link } from 'react-router-dom'


import './submenu.css'


export class MenuItem {
    link: string
    text: string
    icon?: string
    faIcon?: string
    className?: string
    disabled?: boolean
}


export class Submenu extends React.Component<{ items: MenuItem[] }> {

    

    render() {
        return (
            <div className={`submenu`}>
                {this.props.items.map((item, i) => 
                    <Link 
                        key={i} 
                        to={item.link} 
                        className={`
                            submenu-item 
                            ${item.className ? item.className : ''}
                            ${location.pathname === item.link ? 'active' : ''}
                            ${item.disabled ? 'disabled' : ''}
                        `}
                    >   
                        {item.icon ?
                            <img src={item.icon} alt=""/>
                        :                            
                            <i className={`fa ${item.faIcon}`} />
                        }
                        <span>{item.text}</span>
                    </Link>
                )}
            </div>
        )
    }


}
