import * as React from 'react'
import { bind } from 'lodash-decorators'
import { SearchResultType } from '../../search-result-type'
import * as Switch from 'literal-switch'

import './search-result.css'

const githubIcon = require('./github.svg')

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
            <div className="new-project-search-result" onClick={e => this.onItemClick(e)}>
                {
                    Switch({
                        [SearchResultType.ExpositoUser]: () => {
                            return <div>
                                      <i className="ico" style={{backgroundImage: this.props.result.image}}></i>
                                      <span>{this.props.result.name}</span>
                                   </div>
                        },
                        [SearchResultType.GithubRepo]: () => {
                            return <div>
                                      <i className="ico github"></i>
                                      <span>{this.props.result.fullName}</span>
                                   </div>
                        }
                    }, this.props.result.type)
                }
            </div>
        )
    }



}


