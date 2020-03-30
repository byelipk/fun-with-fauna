import useAxios from "./useAxios"

const useCreateTodoApi = text => {

  const [{ response, errors, loading }, postData] = useAxios({
    method: "post",
    url: "/api/create-todo",
    data: {
      text,
    },
  })

  const newTodo = (response && response.data.newTodo) || null

  return [{ newTodo, errors, loading }, postData]
}

export default useCreateTodoApi
