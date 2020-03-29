import React, { useContext } from "react"

import { TodosContext } from "../components/todosContext"

import Todo from "../components/todo"

const Todos = () => {
  const { todos, errors, loading } = useContext(TodosContext)

  return (
    <div>
      {loading && <p>Loading...</p>}

      {errors && errors.map(error => <p>{error.message}</p>)}

      <ul>
        {todos &&
          todos.map(todo => (
            <li key={todo._id}>
              <Todo {...todo} />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Todos
