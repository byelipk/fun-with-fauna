import useAxios from "./useAxios"

const useAllTodosApi = () => {
  const [{ response, errors, loading }, refetchTodos] = useAxios(
    "/api/get-all-todos"
  )

  const todos = (response && response.data.todos) || []

  return [
    {
      todos,
      errors,
      loading,
    },
    refetchTodos,
  ]
}

export default useAllTodosApi
