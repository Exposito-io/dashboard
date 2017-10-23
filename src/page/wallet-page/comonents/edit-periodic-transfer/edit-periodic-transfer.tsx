import * as React from 'react'

import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { bind } from 'bind-decorator'


import {  } from 'models'
import { Panel } from '../../../../components/panel/panel'


import './edit-periodic-transfer.css'


@observer
export class EditPeriodicTransfer extends React.Component<{}, {}> {

    constructor(props: {}) {
        super(props)
    }

    componentDidMount() {
    }

    

    render() {
        return (
            <div className="edit-periodic-transfer">
                <Panel className="dark">

                </Panel>
            </div>
        )
    }


}

