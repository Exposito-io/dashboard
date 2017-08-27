import * as _ from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';

export class Sidebar extends React.Component {

  static propTypes = {
    location: React.PropTypes.shape({
      pathname: React.PropTypes.string.isRequired,
      query: React.PropTypes.object.isRequired,
    }),
  }

  state = {
    navItems: [
      { pathname: '/', label: 'Home', icon: 'home' },
      { pathname: '/instances', label: 'Instances', icon: 'server' },
      { pathname: '/wallets', label: 'Wallets', icon: 'home' },
      { pathname: '/periodic-payments', label: 'Periodic Payments', icon: 'credit-card' },
      { pathname: '/contributors', label: 'Contributors', icon: 'credit-card' }
    ],
  }

  isSelected(navItem) {
    return location.pathname === navItem.pathname ? 'selected' : ''
  }

  renderLinks() {
    return _.map(this.state.navItems, (navItem) => {
      return (
        <li className={`al-sidebar-list-item ${this.isSelected(navItem)}`} key={navItem.pathname}>
          <Link className="al-sidebar-list-link" to={{ pathname: navItem.pathname /*, query: navItem.query*/ }}>
            <i className={`fa fa-${navItem.icon}`}></i>
            <span>{navItem.label}</span>
          </Link>
        </li>
      );
    });
  }

/*
  TODO mcormier: setup swipe
      <aside className="al-sidebar" ng-swipe-right="menuExpand()" ng-swipe-left="menuCollapse()"
        ng-mouseleave="hoverElemTop=selectElemTop">
        <ul className="al-sidebar-list">
          {this.renderLinks()}
        </ul>
      </aside>
*/

  render() {

    return (
      <aside className="al-sidebar">
        <ul className="al-sidebar-list">
          {this.renderLinks()}
        </ul>
      </aside>
    );
  }
}
