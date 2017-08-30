import * as React from 'react'
import { Panel } from 'react-blur-admin'
import { PieChart, Pie, Cell } from 'recharts'
import { bind } from 'bind-decorator'
import { setRef } from '../../../../lib/tools'

import { observer } from 'mobx-react'

import { NewProjectStore } from '../../new-project-store'


const COLORS = ['#0c3d56', '#2978A0', '#4EA5D9', '#68b8e8', '#FFBB28']
const UNALLOCATED_COLOR = '#CCC'

const store = NewProjectStore.getStore()

import './equity-chart.css'

@observer
export class EquityChart extends React.Component {

    

    constructor(props: any) {
        super(props)

    }


    render() {
        return (
            <div className="equity-chart">
                { store.hasShareholders ?  
                    <PieChart width={304} height={304}>
                        <Pie 
                            activeIndex={[]} 
                            data={store.equityChartData}
                            innerRadius={98} 
                            outerRadius={140} 
                            fill="#82ca9d"
                            activeShape={1}
                            border={'none'}
                            stroke="none"
                        >
                        {
                            store.equityChartData.map((entry, i) => {
                                if (entry.name === 'Unallocated')
                                    return <Cell fill={UNALLOCATED_COLOR}/>
                                else
                                    return <Cell fill={COLORS[i % COLORS.length]}/>
                            })          
                        }                    
                        </Pie>
                    </PieChart>
                    :
                    ''
                }
            </div>
        )

    }


}