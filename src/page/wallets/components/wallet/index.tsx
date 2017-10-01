import * as React from 'react'
import * as _ from 'lodash'
import * as moment from 'moment'

import { Panel } from 'react-blur-admin'
import { bind } from 'bind-decorator'
import { Wallet, BitcoinWallet, Transaction } from 'models'
import * as NumberFormat from 'react-number-format'
import { LineChart, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
//import {}



import './wallet.css'


const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 1800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 908, amt: 2000 },
    { name: 'Page D', uv: 2780, pv: 3008, amt: 2000 },
    { name: 'Page D', uv: 2780, pv: 2508, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Page G', uv: 3490, pv: 3900, amt: 2100 },
    { name: 'Page G', uv: 3490, pv: 4000, amt: 2100 },
    { name: 'Page G', uv: 3490, pv: 5000, amt: 2100 },
];


type Props = {
    wallet: Wallet,
    transactions: Transaction[]
}


export class WalletPanel extends React.Component<Props, {}> {


    get wallet() { return this.props.wallet }
    get transactions() { return _(this.props.transactions).sortBy('creationDate').values() }

    render() {
        return (

            <Panel title={this.wallet.name} className="wallet-panel">
                <div className="amount-container">
                    <span className="amount">
                        <span className="currency">$</span>
                        <NumberFormat
                            className="amount-fmt"
                            value={430}
                            displayType={'text'}
                            thousandSeparator={true}
                            decimalPrecision={2}

                        />
                    </span>

                </div>

                <AreaChart width={350} height={150} data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.5} />
                            <stop offset="30%" stopColor="#8884d8" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    {/*<CartesianGrid strokeDasharray="1 1" />*/}
                    <Area type="linear" dataKey="pv" fill="url(#colorUv)" stroke="#8884d8" dot={false} activeDot={{ r: 0 }} />
                </AreaChart>

                <div className="transactions">
                    {this.transactions.map((tx, i) =>
                        <div className="tx">
                            <i className={`source-type`}></i>
                            <span className="date">{moment(tx.creationDate).format('MM/DD')}</span>
                            <span>{tx.note}</span>
                            <i className={`amount-change`}></i>
                            <span className="amount"></span>
                        </div>
                    )}
                </div>
            </Panel>

        )
    }
}

