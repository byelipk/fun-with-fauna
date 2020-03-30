import React, { useReducer, useEffect, useContext } from "react"
import useCreateTodoApi from "./useCreateTodoApi"

import _styles from "./create-todo-form.module.css"

import { TodosContext } from "../components/todosContext"

const initialState = {
  text: "",
  isSuccess: false,
  isError: false,
}

const reducer = (state, action) => {
  if (action.type === "TYPE") {
    return {
      isSuccess: false,
      isError: false,
      text: action.payload.text,
    }
  }

  if (action.type === "RESET") {
    return {
      isSuccess: false,
      isError: false,
      text: "",
    }
  }

  if (action.type === "SUCCESS") {
    return {
      isSuccess: true,
      isError: false,
      text: "",
    }
  }

  if (action.type === "ERROR") {
    return {
      isSuccess: false,
      isError: true,
      text: "",
    }
  }

  return state
}

const CreateTodoForm = () => {
  const { refetchTodos } = useContext(TodosContext)

  const [formState, dispatch] = useReducer(reducer, initialState)

  const { text, isSuccess, isError } = formState

  const [{ newTodo, errors, loading }, createTodo] = useCreateTodoApi(text)

  const handleChange = e => {
    dispatch({ type: "TYPE", payload: { text: e.target.value } })
  }

  const handleResetForm = () => {
    dispatch({ type: "RESET" })
  }

  const handleSubmit = e => {
    e.preventDefault()

    const formIsValid = text && text.length > 0

    if (formIsValid) {
      createTodo()
    }
  }

  useEffect(() => {
    if (Boolean(newTodo)) {
      refetchTodos()
      dispatch({ type: "SUCCESS" })
    } 
    
    if (Boolean(errors)) {
      dispatch({ type: "ERROR" })
    }
  }, [newTodo, errors, refetchTodos])

  return (
    <>
      {isError && (
        <p className={`${_styles.errors}`}>
          We could not create your Todo. Please try again.
        </p>
      )}
      {isSuccess && (
        <p className={`${_styles.success}`}>Todo created successfully!</p>
      )}
      <form className={`${_styles.form}`} onSubmit={handleSubmit}>
        <label className={`${_styles.label}`}>
          <span className={`${_styles.labelText}`}>Create todo:</span>
          <input
            className={`${_styles.input}`}
            type="text"
            name="text"
            value={text}
            onChange={handleChange}
            placeholder="ex. Get Paid"
            autoComplete={"off"}
          />
        </label>

        <button type="submit">{loading ? "Creating..." : "Create"}</button>

        <button type="button" onClick={handleResetForm}>
          Reset
        </button>
      </form>
    </>
  )
}

export default CreateTodoForm
