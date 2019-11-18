import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "./List";
import style from "../style";
import { getTaskFromStorage, setTaskToStorage } from "../helpers/storage";
import SortOptions from "./SortOptions";

class ToDoList extends React.Component {
  state = {
    value: "",
    tasks: getTaskFromStorage() || [],
    sortValue: '',
  };

  handleSort = (value) => {
    if (value === 'alphabeticaly') {
      this.setState({
        sortValue: value,
        tasks: this.state.tasks.map(task => task.taskText + 'sort')
     })
      console.log(this.state)
    }
    else if (value === 'creation date') {
      this.setState({
        sortValue: value
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
      taskText: this.state.value,
      isCompleted: false,
      date: new Date().toLocaleDateString()
    };

    this.setState({
      tasks: [...this.state.tasks, task],
      value: ""
    }, () => setTaskToStorage(this.state.tasks));
  };

  deleteTask = event => {
    const tasks = this.state.tasks.filter(
      (_, index) => index != event.target.id
    );

    this.setState({ tasks: tasks });
    setTaskToStorage(tasks);
  };

  completeTask = event => {
    const tasks = this.state.tasks.map((task, index) => {
      if (index == event.target.id) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    });

    this.setState({ tasks: tasks });
    setTaskToStorage(tasks);
  };

  render() {
    console.log(this.state)
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
        <div style={style.list}>
          {this.state.tasks.map((task, index) => (
            <List
              key={index}
              task={task.taskText} 
              index={index}
              isCompleted={this.state.tasks[index].isCompleted}
              deleteTask={this.deleteTask}
              completeTask={this.completeTask}
              date={task.date}
            />
          ))}
        </div>
        <SortOptions
          handleSort={this.handleSort}
          sortValue={this.state.sortValue}
        />
      </div>
    );
  }
}

export default ToDoList;