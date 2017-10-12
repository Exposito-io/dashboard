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
                    {this.wallet && this.wallet.name}
                </h3>
                {this.renderPeriodicTransferIcon(2)}
                <Link
                    to={`/wallet/${this.wallet.id}`}
                    className="fa fa-cog"
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
                            value={parseFloat(this.wallet.amount)}
                            displayType={'text'}
                            thousandSeparator={true}
                            decimalPrecision={2}
                        />
                    </span>

                </div>

                <AreaChart width={380} height={150} data={this.getChartData()}
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
                    />import * as history from 'history'
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
                            <span className="note">{this.getTxDescription(tx)}</span>
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

    private getTxDescription(tx: Transaction): string {
        if (tx.note)
            return tx.note
        else
            return ''
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


    private renderPeriodicTransferIcon(count: number) {
        let ico = require('./images/periodic-transfer-icon2.svg')
        return (
            <Link 
                to="/" 
                className="periodic-payment-ico"
                title={`${count} periodic transactions`}>
                <img src={ico} alt=""/>
                <span className="count">{count}</span>
            </Link>
        )
    }


    private getChartData() {
        if (this.props.wallet.name.toLowerCase() === 'main wallet') {
            return [
                { name: 'Page A', pv: 2400, amt: 2400 },
                { name: 'Page B', pv: 1398, amt: 2210 },
                { name: 'Page C', pv: 1800, amt: 2290 },
                { name: 'Page D', pv: 908, amt: 2000 },
                { name: 'Page D', pv: 3008, amt: 2000 },
                { name: 'Page D', pv: 2508, amt: 2000 },
                { name: 'Page E', pv: 4800, amt: 2181 },
                { name: 'Page F', pv: 3800, amt: 2500 },
                { name: 'Page G', pv: 4300, amt: 2100 },
                { name: 'Page G', pv: 3900, amt: 2100 },
                { name: 'Page G', pv: 4000, amt: 2100 },
                { name: 'Page G', pv: 5000, amt: 2100 },
            ]
        }
        else {
            let amount = Money.fromStringDecimal(this.wallet.amount, this.wallet.currency)

            let chartData = this.transactions
                        .slice(0, 12)
                        .map(tx => {
                            let txAmount = Money.fromStringDecimal(tx.amount, tx.currency)

                            if (tx.currency === 'USD' && this.wallet.currency === 'BTC')
                                txAmount = convertUsdToBtc(txAmount)

                            if (tx.currency === 'BTC' && this.wallet.currency === 'USD')
                                txAmount = convertBtcToUsd(txAmount)

                            amount = amount.subtract(txAmount)

                            return {
                                name: '',
                                pv: amount.toDecimal()
                            }
                        })
                        .reverse()
                        
            
            chartData.push({ 
                name: '',
                pv: parseFloat(this.wallet.amount)
            })

            return chartData
        }
    }


    private paymentTypeIcon(p: PaymentDestination) {
        switch(p) {
            case PaymentDestination.BITCOIN_ADDRESS:
                return require('./images/bitcoin.svg')
            case PaymentDestination.ETHEREUM_ADDRESS:
                return require('./images/ethereum.svg')
            case PaymentDestination.EXPOSITO_WALLET:
                return require('./images/exposito-logo.svg')
            default: 
                return require('./images/credit-cards2.png')
        }
    }
}



function convertBtcToUsd(btcAmount: Money) {
    return Money.fromStringDecimal(btcAmount.multiply(4526).toString(), 'USD') as Money
}


function convertUsdToBtc(usdAmount: Money) {    
    return Money.fromStringDecimal(usdAmount.toString(), 'BTC').divide(4526) as Money
}

