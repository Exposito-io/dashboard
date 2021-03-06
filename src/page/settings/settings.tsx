import * as React from 'react'
import { autorun, observable, computed, action } from 'mobx'
import { bind } from 'bind-decorator'
import { observer } from 'mobx-react'
import { Panel, Breadcrumbs, Select, Switch, Input } from 'react-blur-admin'
import { Link } from 'react-router-dom'

import { Page } from '../../components/page'
import { preferencesStore } from '../../stores/preferences-store'
import { UserStore } from '../../stores/user-store'
import { ProjectStore } from '../../stores/project-store'
import Toggle from 'react-toggle'


import 'react-toggle/style.css'
import './settings.css'



const prefStore = preferencesStore
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
          <div className="col notifications">
            <Panel title="Notifications">
              <br/>
              <div className="row">
                <span>Send a notification when a new version is deployed</span>
                <Toggle
                  defaultChecked={prefStore.notifications.n1}
                  icons={false}
                  onChange={() => this.onSwitchChange('n1')} 
                />
              </div>

              <div className="row">
                <span>Send a notification when a transaction failed</span>
                <Toggle
                  defaultChecked={prefStore.notifications.n2}
                  icons={false}
                  onChange={() => this.onSwitchChange('n2')} 
                />
              </div>


              <div className="row">
              <span>Send a notification when a vote session is created</span>
              <Toggle
                defaultChecked={prefStore.notifications.n3}
                icons={false}
                onChange={() => this.onSwitchChange('n3')} 
              />
              </div>              


              <div className="row">
              <span>Send a notification a large transaction is processed</span>
              <Toggle
                defaultChecked={prefStore.notifications.n4}
                icons={false}
                onChange={() => this.onSwitchChange('n4')} 
              />
              </div>              


              <div className="row">
              <span>Send a notification when a server is down</span>
              <Toggle
                defaultChecked={prefStore.notifications.n5}
                icons={false}
                onChange={() => this.onSwitchChange('n5')} 
              />
              </div>              
              
            </Panel>          
          </div>
        </div>

        <div className="row">

          <div className="col">
            <Panel title="Collaborators">
              <Input
                onValidate={e => true}
                label='Enable voting for collaborators'
                value={true}
                type="checkbox"
                onChange={e => console.log('')} />
                
            </Panel>
          </div>     

          <div className="col">
            <Panel title="Wallets">
              Default Wallet: <Select
                placeholder='Select a wallet'
                className="project-select"
                options={projectStore.allProjects.map(project => ({ label: project.name, value: project }))}
                onChange={value => this.setState({ selectTwo: value })}
                value={prefStore.preferences.selectedProject} />
            </Panel>
          </div>
        </div> 

        <div className="row">
          <div className="col">
            <Panel title="Instances">
              <br/><br/><br/><br/><br/>
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
