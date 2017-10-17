import * as React from 'react'

import { Page, Panel, Breadcrumbs } from 'react-blur-admin'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

import { AlertStore } from '../../stores/alert-store'

import './alerts.css'


@observer
export class Alerts extends React.Component {

    private store: AlertStore = AlertStore.getStore()


    render() {
        return (
            <div className="alerts-container">
                {this.store.alerts.map((alert, i) => 
                    <div className={`alert alert-${alert.type}`} key={i}>
                        {alert.message}
                    </div>
                )}
            </div>
        )
    }
}
