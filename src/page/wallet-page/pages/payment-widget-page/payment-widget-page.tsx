import * as React from 'react'

import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Select, Input } from 'react-blur-admin'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { bind } from 'bind-decorator'


import { Wallet, BitcoinWallet, Transaction, PaymentDestination } from 'models'
import { Panel } from '../../../../components/panel/panel'


import './payment-widget-page.css'
import { docco, darkula, atomOneDark } from 'react-syntax-highlighter/dist/styles'
const codeString = '(num) => num + 1';

export class PaymentWidgetPage extends React.Component<{}, { src: string }> {

    constructor(props: {}) {
        super(props)
        this.state = { src: '' }
    }

    componentDidMount() {
        setTimeout(() => this.setState({ src: 'http://dev.widget.exposito.io' }), 200)
    }


    @bind codeClick() {
        // TODO
    }
    

    render() {
        return (
            <div className="payment-widget-page">
                <Panel className="dark options" title="Options">
                    Widget theme: 
                    <Select
                        placeholder='Light'
                        className="project-select"
                        options={[]}
                        onChange={() => {}}
                        value={null} 
                    />
                    <br />
                    <Input
                        onValidate={e => true}
                        label='Accept Bitcoins'
                        value={true}
                        type="checkbox"
                        onChange={e => console.log('')} 
                    />  
                    <Input
                        onValidate={e => true}
                        label='Accept Ether'
                        value={true}
                        type="checkbox"
                        onChange={e => console.log('')} 
                    />                                       
                    <Input
                        onValidate={e => true}
                        label='Accept credit cards'
                        value={true}
                        type="checkbox"
                        onChange={e => console.log('')} 
                    />  
                    <br /><br />
                    <h3>Code</h3>
                    
                    
                    <SyntaxHighlighter 
                        language='html' 
                        style={atomOneDark}
                        onClick={this.codeClick}
                        showLineNumbers={true}>
                        {
`<!-- Exposito Payment Widget start. Replace [price] and [currency] parameters with the requested price and currency -->
<iframe 
    style="width: 460px; height: 520px; border: none;"
    src="http://dev.widget.exposito.io?theme=light&payments=[2,1,3]&price=[price]&currency=[currency]">
</iframe>
<!-- Exposito Payment Widget end -->
`
                        }
                    </SyntaxHighlighter>
                    
                </Panel>

                <div className="preview-container">
                    <h3>Preview</h3>
                    <iframe
                        ref="code"
                        src={this.state.src}
                        className="widget-preview">
                    </iframe>
                </div>
            </div>
        )
    }


}

