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
                            let user = this.props.result                         
                            return <div>
                                      <i className="ico" style={{backgroundImage: `url(${user.image}`}}></i>
                                      <span className="desc">
                                          <span className="user-name">{user.name}</span>
                                      </span>
                                   </div>
                        },
                        [SearchResultType.GithubRepo]: () => {
                            let repo = this.props.result
                            return <div>
                                      <i className="ico github"></i>
                                      <span className="desc">
                                          <span className="owner">{repo.owner}</span> 
                                          / 
                                          <span className="repo-name">{repo.name}</span><br/>
                                          <span className="description">{repo.description}</span>
                                      </span>
                                   </div>
                        }
                    }, this.props.result.type)
                }
            </div>
        )
    }



}


