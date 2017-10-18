import * as React from 'react'

import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Select, Input } from 'react-blur-admin'
import SyntaxHighlighter from 'react-syntax-highlighter'


import { Wallet, BitcoinWallet, Transaction, PaymentDestination } from 'models'
import { Panel } from '../../../../components/panel/panel'


import './payment-widget-page.css'
import { docco, darkula, atomOneDark } from 'react-syntax-highlighter/dist/styles'
const codeString = '(num) => num + 1';

export class PaymentWidgetPage extends React.Component {


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
                        showLineNumbers={true}>
                        {
`<script>(function() {
    var l = 2;
    for (var i = 0; i< 10; i++) {
        // TODO
    }
})</script>
`
                        }
                    </SyntaxHighlighter>
                </Panel>

                <div className="preview-container">
                    <h3>Preview</h3>
                    <iframe
                        src="http://dev.widget.exposito.io"
                        className="widget-preview">
                    </iframe>
                </div>
            </div>
        )
    }


}
