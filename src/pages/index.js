import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import CreateTodoForm from "../components/createTodoForm"

import useAllTodosApi from "../components/useAllTodosApi"

const IndexPage = () => {
  const [{ todos, errors, loading }, refetchTodos] = useAllTodosApi()

  return (
    <Layout>
      <SEO title="Fun With Fauna" />
      <h1>Hi people</h1>
      <p>Welcome to your new TODOS App.</p>
      <p>Now go do todos.</p>

      <CreateTodoForm refetchTodos={refetchTodos} />

      <div>
        {loading && <p>Loading...</p>}

        {errors && errors.map(error => (
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
