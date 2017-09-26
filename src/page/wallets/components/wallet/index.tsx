import * as React from 'react'

import { Panel } from 'react-blur-admin'
import { bind } from 'bind-decorator'
import { Wallet } from 'models'


type Props = {
    wallet: Wallet
}


export class Wallets extends React.Component<Props, {}> {

    

    render() {
        return (
            <Panel title='The Team'>
                Lorem Ipsum
            </Panel>

        );
    }
}

