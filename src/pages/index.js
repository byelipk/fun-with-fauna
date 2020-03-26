import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import useAllTodosApi from "../components/useAllTodosApi"

const IndexPage = () => {
  const [todos, todoErrors, isLoadingTodos] = useAllTodosApi()

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new TODOS App.</p>
      <p>Now go do todos.</p>

      <div>
        {isLoadingTodos && <p>Loading...</p>}

        {todoErrors && todoErrors.map(error => (
          <p>{error.message}</p>
        ))}

        <ul>
          {todos && todos.map(todo => (
            <li key={todo._id}>
              <p>{todo.text}</p>
              <p>Completed: {todo.completed ? "YES" : "NO"}</p>
              <button>Complete</button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default IndexPage
