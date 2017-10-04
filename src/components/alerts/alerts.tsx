import * as React from 'react'

import { Page, Panel, Breadcrumbs } from 'react-blur-admin'
import { Link } from 'react-router-dom'

import { AlertStore } from '../../stores/alert-store'

import './alerts.css'


@observer
export class Alerts extends React.Component {

    private store: AlertStore = AlertStore.getStore()


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
            <div className="alerts-container">
                {this.store.alerts.map((alert, i) => 
                    <div className={`alert ${alert.type}`} key={i}>
                        {alert.message}
                    </div>
                )}
            </div>
        )
    }
}
