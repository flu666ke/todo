import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "./List";
import style from "../style";
import { getTaskFromStorage, setTaskToStorage, uuid } from "../helpers/storage";
import SortOptions from "./SortOptions";

class ToDoList extends React.Component {
  state = {
    value: "",
    tasks: getTaskFromStorage() || [],
    sortValue: '',
  };

  handleSort = (value) => {
    this.setState({
      sortValue: value
    })
    if (value === 'alphabeticaly') {
      const tasks = [...this.state.tasks]
      this.setState({
        tasks: tasks.sort((a, b) => (a.taskText > b.taskText ? 1 : -1))
      })
      console.log(this.state)
    }
    else if (value === 'creation date') {
      const tasks = [...this.state.tasks]
      this.setState({
        tasks: tasks.sort((a, b) => (a.date < b.date ? 1 : -1))
      })
      console.log(this.state)
    }
  }


  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  addTask = event => {
    event.preventDefault();

    if (!this.state.value) return;

    const task = {
      id: uuid(),
      taskText: this.state.value,
      isCompleted: false,
      date: new Date().toLocaleDateString()
    };

    this.setState({
      tasks: [...this.state.tasks, task],
      value: ""
    }, () => setTaskToStorage(this.state.tasks));
  };

  deleteTask = id => {
    const tasks = this.state.tasks.filter(
      task => id !== task.id
    );

    this.setState({ tasks: tasks });
    setTaskToStorage(tasks);
  };

  completeTask = id => {
    const tasks = this.state.tasks.map(task => {
      if (id === task.id) {
     return {...task, isCompleted: !task.isCompleted };
      }
      return task;
    });

    this.setState({ tasks: tasks });
    setTaskToStorage(tasks);
  };

  render() {
    console.log(uuid())
    return (
      <div style={style.wrapper}>
        <h1 style={style.header}>My Tasks</h1>
        <form
          onSubmit={this.addTask}
          style={style.form}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-textarea"
            type="text"
            label="Enter New Task"
            multiline
            margin="normal"
            variant="outlined"
            value={this.state.value}
            onChange={this.handleChange}
            name="name"
          />
          <Button
            style={{ margin: "24px" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Add Task
          </Button>
        </form>
        <div style={style.container}>
          <div style={style.list}>
            {this.state.tasks.map(task => (
              <List
                key={task.id}
                task={task}
                isCompleted={task.isCompleted}
                deleteTask={this.deleteTask}
                completeTask={this.completeTask}
                date={task.date}
              />
            ))}
          </div>
          <div style={style.sort}>
            <SortOptions
              handleSort={this.handleSort}
              sortValue={this.state.sortValue}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoList;