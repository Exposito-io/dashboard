import * as React from 'react'
import { autorun, observable, computed, action } from 'mobx'
import { bind } from 'bind-decorator'
import { observer } from 'mobx-react'
import { Page, Panel, Breadcrumbs, Select, Switch } from 'react-blur-admin'
import { Link } from 'react-router-dom'

import { PreferencesStore } from '../../stores/preferences-store'
import { UserStore } from '../../stores/user-store'
import { ProjectStore } from '../../stores/project-store'
import Toggle from 'react-toggle'


import 'react-toggle/style.css'
import './settings.css'



const prefStore = PreferencesStore.getStore()
const userStore = UserStore.getStore()
const projectStore = ProjectStore.getStore()



@observer
export class SettingsPage extends React.Component {


  constructor() {
    super()
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to="/">
          Home
        </Link>
          Settings
      </Breadcrumbs>
    )
  }

  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title="Settings" className="settings-page">
        <div className="row">
          <div className="col">
            <Panel title="General">
              Default Project: <Select
                placeholder='Select a project'
                options={projectStore.allProjects.map(project => ({ label: project.name, value: project }))}
                onChange={value => this.setState({ selectTwo: value })}
                value={prefStore.preferences.selectedProject} />
            </Panel>          
          </div>
          <div className="col">
            <Panel title="Notifications">
              <span>Send a notification when a new version is deployed</span>
              <Toggle
                defaultChecked={prefStore.notifications.n1}
                icons={false}
                onChange={() => this.onSwitchChange('n1')} 
              /><br/>

              <span>Send a notification when a new version is deployed</span>
              <Toggle
                defaultChecked={prefStore.notifications.n2}
                icons={false}
                onChange={() => this.onSwitchChange('n2')} 
              />
              <br/>


              <span>Send a notification when a new version is deployed</span>
              <Toggle
                defaultChecked={prefStore.notifications.n3}
                icons={false}
                onChange={() => this.onSwitchChange('n3')} 
              /><br/>              


              <span>Send a notification when a new version is deployed</span>
              <Toggle
                defaultChecked={prefStore.notifications.n4}
                icons={false}
                onChange={() => this.onSwitchChange('n4')} 
              /><br/>              


              <span>Send a notification when a new version is deployed</span>
              <Toggle
                defaultChecked={prefStore.notifications.n5}
                icons={false}
                onChange={() => this.onSwitchChange('n5')} 
              /><br/>              
              
            </Panel>          
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Panel title="Wallets">

            </Panel>
          </div>
        </div> 

        <div className="row">
          <div className="col">
            <Panel title="Collaborators">

            </Panel>
          </div>
        </div>

      </Page>
    )
  }
  

  @bind
  private onSwitchChange(notification: string) {
    prefStore.notifications = Object.assign(
                                {}, 
                                prefStore.notifications, 
                                { [notification]: !prefStore.notifications[notification] }
                              )
    
  }
}
