import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { TodosProvider } from "../components/todosContext"

import Todos from "../components/todos"
import CreateTodoForm from "../components/createTodoForm"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Fun With Fauna" />
      <h1>Hi people</h1>
      <p>Welcome to your new TODOS App.</p>
      <p>Now go do todos.</p>

      <TodosProvider>
        <CreateTodoForm />
        <Todos />
      </TodosProvider>
    </Layout>
  )
}

export default IndexPage
