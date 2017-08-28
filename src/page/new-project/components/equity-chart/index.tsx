import * as React from 'react'
import { PieChart, Pie } from 'recharts'
import { bind } from 'bind-decorator'
import { setRef } from '../../../../lib/tools'

import { observer } from 'mobx-react'
import { NewProjectStore } from '../../new-project-store'


const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
                  {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

const data02 = [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
                  {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
                  {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];


const store = NewProjectStore.getStore()



@observer
export class EquityChart extends React.Component {

    

    constructor(props: any) {
        super(props)

    }


    render() {
        return (
            <PieChart width={200} height={200}>
                <Pie 
                    activeIndex={[]} 
                    data={data02}
                    innerRadius={40} 
                    outerRadius={80} 
                    fill="#82ca9d"
                    activeShape={1}
                />
            </PieChart>
        )

    }


}