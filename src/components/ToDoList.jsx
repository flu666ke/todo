import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "./List";
import style from "../style";
import { setTaskToStorage, getTaskFromStorage } from "../helpers/setTask";

class ToDoList extends React.Component {
  state = {
    value: "",
    tasks: getTaskFromStorage() || []
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  addTask = event => {
    event.preventDefault();

    if (!this.state.value) return;

    const task = {
      taskText: this.state.value,
      isCompleted: false
    };

    this.setState({
      tasks: [...this.state.tasks, task],
      value: ""
    });
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
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ToDoList;