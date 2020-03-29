import React, { createContext, useState, useEffect, useRef } from "react"

import useAllTodosApi from "./useAllTodosApi"

export const TodosContext = createContext({
  loading: false,
  errors: null,
  todos: [],
  lastTodoCreatedAt: null,
})

const sortTodos = (todos = []) => {
  return todos.sort((a, b) => b._ts - a._ts)
}

export const TodosProvider = ({ children }) => {
  const [
    { todos: todosFromApi, loading, errors },
    refetchTodos,
  ] = useAllTodosApi()

  const sortedTodos = sortTodos(todosFromApi)
  const lastTodo = sortedTodos[0] || {}
  const lastTodoTs = lastTodo._ts || null

  const prevLastTodoTs = useRef(null)

  // Our managed todo state
  const [todos, setTodos] = useState([])

  // Always provide the newest list of todos to consumers of this context.
  // Handle dependency checking manually.
  useEffect(() => {
    if (lastTodoTs > prevLastTodoTs.current) {
      setTodos(() => sortedTodos)
    }
  })

  // Re-run after every render so we always 
  // know when the last todo was created.
  useEffect(() => {
    prevLastTodoTs.current = lastTodoTs
  })

  const value = {
    todos,
    loading,
    errors,
    lastTodoCreatedAt: lastTodoTs,
    setTodos,
    refetchTodos,
  }

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
}
