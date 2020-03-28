import useAxios from "./useAxios"

const useUpdateTodoApi = (id) => {

  const [{ response, errors, loading }, deleteTodo] = useAxios(    {
    method: "post",
    url: "/api/delete-todo",
    data: {
      id,
    },
  })

  const deletedTodo = (response && response.data.deletedTodo) || null

  return [{ todo: deletedTodo, errors, loading }, deleteTodo]
}

export default useUpdateTodoApi
