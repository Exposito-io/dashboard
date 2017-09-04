import * as React from 'react'
import { Link } from 'react-router-dom'
import * as moment from 'moment'
import * as _ from 'lodash'
import { observer } from 'mobx-react'

var person = require('../../assets/img/person.svg')

import { SearchBar } from './search-bar'

// Lib
// import eventBus from 'src/lib/event-bus';
import { NotificationsAlert, NotificationAlert } from 'react-blur-admin'
import { Row, Col } from 'react-flex-proto'

import { ProjectStore } from '../../stores/project-store'
import { PreferencesStore } from '../../stores/preferences-store'
import { NotificationStore } from '../../stores/notification-store'


@observer
export class PageTop extends React.Component<{}, {}> {

  static propTypes = {
    user: React.PropTypes.object,
    location: React.PropTypes.shape({
      pathname: React.PropTypes.string.isRequired,
      query: React.PropTypes.object.isRequired,
    }),
  }

  state = {
    isMenuOpen: false,
    isProjectMenuOpen: false
  }

  props

  private projectStore: ProjectStore
  private preferencesStore: PreferencesStore
  private notificationStore: NotificationStore

  constructor(props) {
    super(props)

    this.projectStore = ProjectStore.getStore()
    this.preferencesStore = PreferencesStore.getStore()
    this.notificationStore = NotificationStore.getStore()

  }


  componentWillMount() {

  }

  onProjectClick = (projectId: string) => {
    
  }

  onToggleMenu = () => {
    this.setState({ isMenuOpen: ! this.state.isMenuOpen });
  }

  onToggleProjectMenu = () => {
    this.setState({ isProjectMenuOpen: ! this.state.isProjectMenuOpen });
  }

  onLogout() {
    //eventBus.emit('logout');
  }


  renderNotifications() {

    let notifications = _.assign({}, (this.notificationStore.notifications as any).toJS())
    return _.map(notifications, (notification, index) => {
      return (
        <NotificationAlert {...notification} key={index}/>
      )
    })
  }


  renderUserSection() {
    return (
      <div className="user-profile clearfix">
        <div className={`al-user-profile dropdown ${this.state.isMenuOpen ? 'open' : ''}`}>
          <a className="profile-toggle-link dropdown-toggle" onClick={this.onToggleMenu}>
            <img src={this.props.user && this.props.user.picture ? this.props.user.picture : person}/>
          </a>
          <ul className="top-dropdown-menu profile-dropdown dropdown-menu">
            <li><i className="dropdown-arr"></i></li>
            <li><Link to="/"><i className="fa fa-user"></i>Profile</Link></li>
            <li><Link to="/'"><i className="fa fa-cog"></i>Settings</Link></li>
            <li>
              <a href="/" className="signout" onClick={e => this.onLogout()}>
                <i className="fa fa-power-off"></i>Sign out
              </a>
            </li>
          </ul>
        </div>
        <Row>
        <div className={`al-project-menu dropdown ${this.state.isProjectMenuOpen ? 'open' : ''}`}>
          <a className="project-toggle-link dropdown-toggle" onClick={this.onToggleProjectMenu}>
            {this.preferencesStore.preferences.selectedProject.name} <i className="fa fa-caret-down"></i>
          </a>
          <ul className="top-dropdown-menu profile-dropdown dropdown-menu">
            <li><i className="dropdown-arr"></i></li>
            {this.projectStore.availableProjects.map(project => (
              <li key={project.id}><a className="fa" onClick={() => this.onProjectClick(project.id)}>{project.name}</a></li>
            ))}
            <li>
              <Link to="/new-project" className="signout">
                <i className="fa fa-plus-circle"></i>Create Project
              </Link>
            </li>
          </ul>
        </div>
          <Col padding='5px 2px'>
            <NotificationsAlert
              notificationCount={this.notificationStore.notifications.length}
              markAllAsReadOnClick={_.noop}
              allNotificationsOnClick={_.noop}
              settingsOnClick={_.noop} >
                {this.renderNotifications()}
            </NotificationsAlert>
          </Col>          
        </Row>
   
      </div>
    );
  }

  render() {
    return (
      <div className="page-top clearfix" scroll-position="scrolled" max-height="50">
        <a href="" className="collapse-menu-link ion-navicon"></a>

        <h1 id="logo">exposito</h1>

        <div className="search">
          <SearchBar />
        </div>
        {this.renderUserSection()}
      </div>
    );
  }
}
