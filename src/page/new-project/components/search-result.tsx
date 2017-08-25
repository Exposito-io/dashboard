import * as React from 'react'




export class SearchResult extends React.Component {

    props: any

    constructor(props: any) {
        super(props)


    }


    onItemClick(event) {

    }


    render() {
        return (
            <div>
                {this.props.result.name}
            </div>
        )
    }

}


