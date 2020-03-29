import React, { createContext } from "react"

import useAllTodosApi from "./useAllTodosApi"

export const TodosContext = createContext({
  loading: false,
  errors: null,
  todos: [],
  lastTodoCreatedAt: null
})

export const TodosProvider = ({ children }) => {
  const [{ todos, loading, errors }, refetchTodos] = useAllTodosApi()

  const sortedTodos = (todos && todos.reverse()) || []
  const lastTodo = (sortedTodos && sortedTodos[0]) || {}
  const lastTodoCreatedAt = (lastTodo && lastTodo._ts) || null

  const value = { 
    todos: sortedTodos, 
    lastTodoCreatedAt, 
    loading, 
    errors,
    refetchTodos
  }

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  )
}
