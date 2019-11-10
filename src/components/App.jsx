import React from 'react';
import storage from '../helpers/storage';
import List from './List';

class App extends React.Component {

  state = {
    value: '',
    tasks: JSON.parse(storage.getItem('tasks'))
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  addTask = (event) => {
    event.preventDefault()
    let text = this.state.value

    const itemObj = {
      taskText: text,
      isComleted: false
    }

    if (storage.getItem('tasks') === null) {
      const tasks = []
      tasks.push(itemObj)
      storage.setItem('tasks', JSON.stringify(tasks))
    } else {
      const tasks = JSON.parse(storage.getItem('tasks'))
      tasks.push(itemObj)
      storage.setItem('tasks', JSON.stringify(tasks))
    }

    this.setState({
      tasks: JSON.parse(storage.getItem('tasks'))
    })

    this.setState({
      value: ''
    })
  }

  deleteTask = (event) => {
    let index = event.target.getAttribute('id')
    const tasksList = JSON.parse(storage.getItem('tasks'))
    tasksList.splice(index, 1)
    this.setState({
      tasks: tasksList
    })

    storage.setItem('tasks', JSON.stringify(tasksList))
    console.log('what index?', index)

  }

  render() {
    return (
      <div>
        <form onSubmit={this.addTask}>
          <input
            type='text'
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button>Add task</button>
        </form>
        <div>
          {this.state.tasks ? this.state.tasks.map((task, index) =>
            <List
              key={index}
              task={task.taskText}
              isComleted={task.isComleted}
              index={index}
              deleteTask={this.deleteTask}
            />) : ''}
        </div>
      </div>
    );
  }
}

export default App;
