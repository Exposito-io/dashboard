import * as React from 'react'
import * as _ from 'lodash'
import * as moment from 'moment'
import * as BigNumber from 'bignumber.js'
import { bind } from 'bind-decorator'
import { Link } from 'react-router-dom'
import { Money, Currencies } from 'ts-money'
//import { Panel } from 'react-blur-admin'
import { Panel } from '../../../../components/panel/panel'
import { Wallet, BitcoinWallet, Transaction, PaymentDestination } from 'models'
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
]


type Props = {
    wallet: Wallet,
    transactions: Transaction[]
}


export class WalletPanel extends React.Component<Props, {}> {


    get wallet() { return this.props.wallet }
    get transactions() { 
        return _(this.props.transactions)
               .sortBy('creationDate')
               .reverse()
               .value() 
    }

    renderHeader() {
        return (
            <div className="wallet-header">
                <h3 className='panel-title'>
                    {this.wallet.name}
                </h3>
                <Link
                    to="/"
                    className="fa fa-cogs"
                    title="Wallet settings"
                />
            </div>
        )
    }

    render() {
        return (

            <Panel header={this.renderHeader()} className="wallet-panel">
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

                <AreaChart width={380} height={150} data={data}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2978A0" stopOpacity={1} />
                            <stop offset="50%" stopColor="#2978A0" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#2978A0" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <Area 
                        type="linear" 
                        dataKey="pv" 
                        fill="url(#colorUv)" 
                        stroke="#2978A0" 
                        dot={false} 
                        activeDot={{ r: 0 }} 
                    />
                </AreaChart>

                <div className="transactions">
                    {this.transactions.map((tx, i) =>
                        <div className="tx" key={i}>
                            <i 
                                className={`source-type`} 
                                style={{ 
                                    backgroundImage: `url(${this.paymentTypeIcon(tx.sourceType)})`
                                }}
                            />
                            <span className="date">{moment(tx.endDate).format('MMM DD')}</span>
                            <span className="note">{tx.note}</span>
                            <i className={`amount-change`}></i>
                            <span className={`amount ${this.getAmountClass(tx.amount)}`}>
                                {this.renderTransactionAmount(tx)}
                            </span>
                        </div>
                    )}
                </div>
            </Panel>

        )
    }


    private getAmountClass(amount: string): string {
        let num = new BigNumber(amount)
        if (num.isNegative())
            return 'neg'
        else
            return 'pos'
    }

    private getTransactionCurrency(tx: Transaction): string {
        return 'BTC'
    }

    private renderTransactionAmount(tx: Transaction) {
        
        let amount = Money.fromStringDecimal(tx.amount, tx.currency)
        
        if (amount.currency === 'USD') {
            return (
                <span>
                    <span className="currency">
                        {Currencies[tx.currency].symbol}
                    </span>
                    {amount.toString()}
                </span>
            )
        }
        else {
            return (
                <span>
                    {amount.toDecimal()}
                    <span className="currency">
                        {Currencies[tx.currency].symbol_native}
                    </span>
                </span>
            )
        }
    }


    private paymentTypeIcon(p: PaymentDestination) {
        switch(p) {
            case PaymentDestination.BITCOIN_ADDRESS:
                return require('./images/bitcoin.svg')
            case PaymentDestination.ETHEREUM_ADDRESS:
                return require('./images/ethereum.svg')
            default: 
                return require('./images/credit-cards2.png')
        }
    }
}

