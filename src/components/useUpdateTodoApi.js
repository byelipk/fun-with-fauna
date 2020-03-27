import useAxios from "./useAxios"

const useUpdateTodoApi = (id, text, completed) => {

  const [{ response, errors, loading }, updateTodo] = useAxios(    {
    method: "post",
    url: "/api/toggle-completed",
    data: {
      id,
      text,
      completed
    },
  })

  const updatedTodo = (response && response.data.updatedTodo) || null

  return [{ todo: updatedTodo, errors, loading }, updateTodo]
}

export default useUpdateTodoApi
