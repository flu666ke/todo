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

const List = ({ task, deleteTask, completeTask, isCompleted, date }) => {

  const handleComplete = id => () => {
    completeTask(id)
  }

  const handleDelete = id => () => {
    deleteTask(id)
  }

  return (
    <div style={style.wrapper}>
      <span style={style.text}>{task.taskText}</span>
      <time>{date}</time>
      <button style={style.button} onClick={handleComplete(task.id)}>
        {isCompleted ? "Done" : "Not done"}
      </button>
      <button style={style.button} onClick={handleDelete(task.id)}>
        Delete
      </button>
    </div>
  );
};

export default withStyles(style)(List);