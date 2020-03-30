import axios from "axios"

import { useReducer, useCallback, useEffect } from "react"

import usePrevious from "./usePrevious"

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

const parse = string => {
  try {
    return JSON.parse(string)
  } catch (error) {
    return null
  }
}

const useAxios = config => {
  const shouldTreatConfigAsString = typeof config === "string"

  if (shouldTreatConfigAsString) {
    config = {
      url: config,
    }
  }

  const payload = stringify(config)

  const [state, dispatch] = useReducer(reducer, initialState)

  const { trigger, response, errors, loading } = state

  const previousTrigger = usePrevious(trigger)

  // This function never needs to change
  const triggerRequest = useCallback(() => {
    dispatch({ type: "TRIGGER" })
  }, [])

  // No dependency array here. 
  // If previous trigger is same as current trigger, bail.
  useEffect(() => {
    if (previousTrigger === trigger) return

    const requestData = parse(payload)

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
  })

  return [{ response, errors, loading }, triggerRequest]
}

export default useAxios
