import React, { createContext, useState, useEffect } from "react"

import usePrevious from "./usePrevious"

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

  const prevLastTodoTs = usePrevious(lastTodoTs)

  // Our managed todo state
  const [todos, setTodos] = useState([])

  useEffect(() => {
    refetchTodos()
  }, [])

  // Always provide the newest list of todos to consumers of this context.
  // Handle dependency checking manually.
  useEffect(() => {
    if (lastTodoTs > prevLastTodoTs) {
      setTodos(() => sortedTodos)
    }
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
