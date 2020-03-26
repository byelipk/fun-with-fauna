import useAxios from "./useAxios"

const useAllTodosApi = () => {
  const [{ response, errors, loading }] = useAxios(
    "/api/get-all-todos"
  )

  const todos = (response && response.data.todos) || []

  return [todos, errors, loading]
}

export default useAllTodosApi
