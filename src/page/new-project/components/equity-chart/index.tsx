import * as React from 'react'
import { Panel } from 'react-blur-admin'
import { PieChart, Pie } from 'recharts'
import { bind } from 'bind-decorator'
import { setRef } from '../../../../lib/tools'

import { observer } from 'mobx-react'

import { NewProjectStore } from '../../new-project-store'


const data02 = [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
                  {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
                  {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];


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
                <PieChart width={304} height={304}>
                    <Pie 
                        activeIndex={[]} 
                        data={store.equityChartData}
                        innerRadius={100} 
                        outerRadius={140} 
                        fill="#82ca9d"
                        activeShape={1}
                    />
                </PieChart>
            </div>
        )

    }


}