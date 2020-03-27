const useAxiosConfig = (config, testFn) => {

  // Sometimes we want a null config so that the `useAxios` 
  // hook does not send a request in spite of receiving
  // new props.
  if (typeof testFn === "function" && testFn()) {
    return config
  }

  return null
}

export default useAxiosConfig