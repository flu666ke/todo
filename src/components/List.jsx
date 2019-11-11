import React from 'react'

class List extends React.Component {

    render() {
        const { task, index, deleteTask, completedTask, isComleted } = this.props
        return (
            <div>
                <span>{task}</span>
                <button
                    onClick={completedTask}
                    id={index}
                >
                    {isComleted ? 'done' : 'not'}
                </button>
                <button
                    onClick={deleteTask}
                    id={index}
                >Remove Task</button>
            </div>
        )
    }

}

export default List



