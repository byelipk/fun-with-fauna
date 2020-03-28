import axios from "axios"

import { useReducer, useCallback, useEffect } from "react"

const initialState = {
  loading: false,
  errors: null,
  response: null,
  trigger: 0,
}

const reducer = (state, action) => {
  if (action.type === "LOADING") {
    return {
      ...state,
      response: null,
      errors: null,
      loading: true,
    }
  }

  if (action.type === "ERRORS") {
    return {
      ...state,
      response: null,
      errors: action.errors,
      loading: false,
    }
  }

  if (action.type === "RESPONSE") {
    return {
      ...state,
      response: action.response,
      errors: null,
      loading: false,
    }
  }

  if (action.type === "TRIGGER") {
    return {
      ...state,
      trigger: state.trigger + 1,
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
    return ""
  }
}

const useAxios = config => {
  const shouldTreatConfigAsString = typeof config === "string"

  if (shouldTreatConfigAsString) {
    config = {
      url: config,
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const { trigger, response, errors, loading } = state

  // We want react to diff primitive values, not objects
  const payload = stringify(config)

  // This function never needs to change
  const triggerRequest = useCallback(() => {
    dispatch({ type: "TRIGGER" })
  }, [])

  useEffect(() => {

    // If there's no request to make,
    // or our own internal trigger is falsey, bail.
    if (!payload) return
    if (!trigger) return

    // `payload` will be a JSON string
    const requestData = JSON.parse(payload)

    // Bail if for some reason there is no request data
    if (!requestData) {
      return
    }

    dispatch({ type: "LOADING" })

    axios(requestData)
      .then(response => {
        dispatch({ type: "RESPONSE", response })
      })
      .catch(errors => {
        dispatch({ type: "ERRORS", errors })
      })
  }, [payload, trigger])

  useEffect(() => {
    // Support triggering an initial request based
    // on passing in a URL string.
    if (trigger === initialState.trigger && shouldTreatConfigAsString) {
      triggerRequest()
    }
  }, [trigger, shouldTreatConfigAsString, triggerRequest])

  return [{ response, errors, loading }, triggerRequest]
}

export default useAxios
