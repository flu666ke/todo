import React from 'react'

const List = ({ task, isCompleted, index, deleteTask }) => {

    return (
        <div>
            <span>{task}</span>
            <input type="checkbox" checked={isCompleted} id={index}/>is completed? 
            <button
                onClick={deleteTask}
                id={index}
            >Remove Task</button>
        </div>
    )
}

export default List

