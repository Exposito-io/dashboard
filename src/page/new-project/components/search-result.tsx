import * as React from 'react'
import { bind } from 'lodash-decorators'
import { SearchResultType } from '../search-result-type'



export class SearchResult extends React.Component {

    props: any

    constructor(props: any) {
        super(props)


    }

    //@bind
    onItemClick(event) {
        if (typeof this.props.onClick === 'function')
            this.props.onClick(this.props.result)
    }


    render() {
        return (
            <div onClick={e => this.onItemClick(e)}>
                {this.props.result.name}
            </div>
        )
    }

}


