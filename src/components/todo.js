import React from "react"

import useUpdateTodoApi from "./useUpdateTodoApi"
import useDeleteTodoApi from "./useDeleteTodoApi"

const Todo = ({ _id, text, completed }) => {
  const [_a, updateTodo] = useUpdateTodoApi(_id, text, !completed)
  const [_b, deleteTodo] = useDeleteTodoApi(_id)

  const toggleComplete = () => {
    updateTodo()
  }

  const handleDelete = () => {
    deleteTodo()
  }

  return (
    <>
      <p>{text}</p>
      <p>Completed: {completed ? "YES" : "NO"}</p>
      <button type="button" onClick={toggleComplete}>
        Complete
      </button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </>
  )
}

export default Todo
