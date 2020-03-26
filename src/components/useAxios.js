import axios from "axios"

import { useReducer, useCallback, useEffect, useState } from "react"

const initialState = {
  loading: false,
  errors: null,
  response: null,
  trigger: 0,
}

const reducer = (state, action) => {
  if (action.type === "LOADING") {
    return {
      ...initialState,
      loading: true,
    }
  }

  if (action.type === "ERRORS") {
    return {
      ...initialState,
      errors: action.errors,
    }
  }

  if (action.type === "RESPONSE") {
    return {
      ...initialState,
      response: action.response,
    }
  }

  return state
}

const stringify = config => {
  if (typeof config === "object") {
    try {
      return JSON.stringify(config)
    } catch (error) {
      return ""
    }
  } else if (typeof config === "string") {
    return config
  } else {
    throw new Error("Unable to parse config")
  }
}

const useAxios = (config = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [trigger, setTrigger] = useState(0)

  const { response, errors, loading } = state

  const payload = stringify(config)

  const sendRequest = useCallback(() => {
    setTrigger(trigger => trigger + 1)
  }, [])

  useEffect(() => {
    if (!payload || !trigger) return

    let axiosConfig = null

    try {
      axiosConfig = JSON.parse(payload)
    } catch (error) {
      axiosConfig = payload
    }

    dispatch({ type: "LOADING" })

    axios(axiosConfig)
      .then(response => {
        dispatch({ type: "RESPONSE", response })
      })
      .catch(errors => {
        dispatch({ type: "ERRORS", errors })
      })
  }, [payload, trigger])

  useEffect(() => {
    if (trigger === initialState.trigger) {
      setTrigger(1)
    }
  }, [trigger])

  return [{ response, errors, loading }, sendRequest]
}

export default useAxios
