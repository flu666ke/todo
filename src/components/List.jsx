import React from "react";
import { withStyles } from "@material-ui/core/styles";

const style = {
  wrapper: {
    margin: "10px"
  },
  text: {
    marginRight: "10px"
  },
  button: {
    margin: "5px",
    borderRadius: "2px",
    width: "71px"
  }
};

const List = ({ task, deleteTask, completeTask }) => {
  return (
    <div style={style.wrapper}>
      <span style={style.text}>{task.taskText}</span>
      <time>{task.date}</time>
      <button style={style.button} onClick={() => completeTask(task.id)}>
        {task.isCompleted ? "Done" : "Not done"}
      </button>
      <button style={style.button} onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </div>
  );
};

export default withStyles(style)(List);
