import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import storage from '../helpers/storage';
import List from './List';

const style = ({
  wrappper: {
    backgroundColor: '#FFFFE0',
    height: '100vh',
    width: '800px',
    margin: 'auto',
    borderRadius: '5px',
    boxShadow: '0px 0px 5px 2px black',
  },
  header: {
    padding: '30px',
    textAlign: 'center',
  },
  form: {
    textAlign: 'center',
  },
  list: {
    margin: '20px 0px 30px 120px'
  },
});

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
    if (!text) return
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
  }

  completedTask = (event) => {
    let index = event.target.getAttribute('id')
    const tasksList = JSON.parse(storage.getItem('tasks'))
    const doneTask = tasksList[index]
    doneTask.isComleted = !doneTask.isComleted
    this.setState({
      tasks: tasksList
    })
    storage.setItem('tasks', JSON.stringify(tasksList))
  }

  render() {
    return (
      <div style={style.wrappper}>
        <h1 style={style.header}>My Tasks</h1>
        <form onSubmit={this.addTask} style={style.form} noValidate autoComplete="off">
          <TextField
            id="outlined-textarea"
            type='text'
            label="Enter New Task"
            multiline
            margin="normal"
            variant="outlined"
            value={this.state.value}
            onChange={this.handleChange}
            name="name"
          />
          <Button style={{ margin: '24px' }} type="submit" variant="contained" color="primary">
            Add Task
             </Button>
        </form>
        <div style={style.list}>
          {this.state.tasks && this.state.tasks.map((task, index) =>
            <List
              key={index}
              task={task.taskText}
              index={index}
              isComleted={this.state.tasks[index].isComleted}
              deleteTask={this.deleteTask}
              completedTask={this.completedTask}
            />)}
        </div>
      </div>
    );
  }
}

export default withStyles(style)(App);
