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

const List = ({ task, index, deleteTask, completeTask, isCompleted }) => {
  return (
    <div style={style.wrapper}>
      <span style={style.text}>{task}</span>
      <button style={style.button} onClick={completeTask} id={index}>
        {isCompleted ? "Done" : "Not done"}
      </button>
      <button style={style.button} onClick={deleteTask} id={index}>
        Delete
      </button>
    </div>
  );
};

export default withStyles(style)(List);