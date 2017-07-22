import * as React from 'react'
import { autorun, observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import { Page, Panel, Breadcrumbs } from 'react-blur-admin'
import { Link } from 'react-router-dom'

class ObservableTodoStore {
  @observable todos = [];
  @observable pendingRequests = 0;

  constructor() {
    autorun(() => console.log(this.report));
  }

  @computed get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  @computed get report() {
    if (this.todos.length === 0)
      return '<none>';
    return `Next todo: "${this.todos[0].task}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }
}


const observableTodoStore = new ObservableTodoStore()

setInterval(() => {
  observableTodoStore.addTodo('read MobX tutorial');
}, 5000)

@observer
export class Dashboard extends React.Component {

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to="/">
          Home
        </Link>
          Home
      </Breadcrumbs>
    )
  }

  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title="Home">
        <Panel title="The Team">
          Lorem Ipsum
          {observableTodoStore.report}
        </Panel>
      </Page>
    );
  }
}
