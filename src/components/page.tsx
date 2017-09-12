import * as React from 'react'

export class Props {
    title: string
    actionBar
    className: string
}

export class Page extends React.Component<Props> {

  static propTypes = {
    title: React.PropTypes.string,
    actionBar: React.PropTypes.node,
  }

  renderTitle() {
    if (! this.props.title) {
      return null;
    }

    return (
      <div className="col">
        <h1 className='al-title'>{this.props.title}</h1>
      </div>
    );
  }

  renderActionBar() {
    if (! this.props.actionBar) {
      return null;
    }

    return (
      <div className="col" style={{ textAlign: 'right'}}>
        {this.props.actionBar}
      </div>
    )
  }

  render() {
    return (
      <div className={this.props.className ? this.props.className : ''}>
        <div className="content-top clearfix">
          <div className="row">
            {this.renderTitle()}
            {this.renderActionBar()}
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
