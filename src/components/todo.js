import React from "react"

import useUpdateTodoApi from "./useUpdateTodoApi"

const Todo = ({ _id, text, completed }) => {
  const [_state, updateTodo] = useUpdateTodoApi(_id, text, !completed)

  const toggleComplete = () => {
    updateTodo()
  }

  return (
    <>
      <p>{text}</p>
      <p>Completed: {completed ? "YES" : "NO"}</p>
      <button type="button" onClick={toggleComplete}>
        Complete
      </button>
    </>
  )
}

export default Todo
