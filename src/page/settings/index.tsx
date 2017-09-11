import * as React from 'react'
import { autorun, observable, computed, action } from 'mobx'
import { bind } from 'bind-decorator'
import { observer } from 'mobx-react'
import { Page, Panel, Breadcrumbs, Select, Switch } from 'react-blur-admin'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-flex-proto'

import { PreferencesStore } from '../../stores/preferences-store'
import { UserStore } from '../../stores/user-store'
import { ProjectStore } from '../../stores/project-store'



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
      <Page actionBar={this.renderBreadcrumbs()} title="Settings">
        <Row>
          <Col padding={5}>
            <Panel title="General">
              Default Project: <Select
                placeholder='Select a project'
                options={projectStore.allProjects.map(project => ({ label: project.name, value: project }))}
                onChange={value => this.setState({ selectTwo: value })}
                value={prefStore.preferences.selectedProject} />
            </Panel>          
          </Col>
          <Col padding={5}>
            <Panel title="Notifications">
              <Switch 
                type='primary' 
                isOn={prefStore.notifications.n1} 
                onChange={() => this.onSwitchChange('n1')}  
              />
              <span>Send a notification when a new version is deployed</span><br/>

              <Switch 
                type='primary' 
                isOn={prefStore.notifications.n2} 
                onChange={() => this.onSwitchChange('n2')}  
              />
              <span>Send a notification when a new version is deployed</span><br/>

              <Switch 
                type='primary' 
                isOn={prefStore.notifications.n3} 
                onChange={() => this.onSwitchChange('n3')}  
              />
              <span>Send a notification when a new version is deployed</span><br/>

              <Switch 
                type='primary' 
                isOn={prefStore.notifications.n4} 
                onChange={() => this.onSwitchChange('n4')}  
              />
              <span>Send a notification when a new version is deployed</span><br/>

              <Switch 
                type='primary' 
                isOn={prefStore.notifications.n5} 
                onChange={() => this.onSwitchChange('n5')}  
              />
              <span>Send a notification when a new version is deployed</span><br/>                                                        

              
            </Panel>          
          </Col>
        </Row>

        <Row>
          <Col>
            <Panel title="Wallets">

            </Panel>
          </Col>
        </Row> 

        <Row>
          <Col>
            <Panel title="Collaborators">

            </Panel>
          </Col>
        </Row>

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
