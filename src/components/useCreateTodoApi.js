import useAxios from "./useAxios"
import useAxiosConfig from "./useAxiosConfig"

const useCreateTodoApi = text => {

  const axiosConfig = useAxiosConfig(
    {
      method: "post",
      url: "/api/create-todo",
      data: {
        text,
      },
    },
    () => Boolean(text)
  )


  const [{ response, errors, loading }, createTodo] = useAxios(axiosConfig)

  const newTodo = (response && response.data.newTodo) || null

  return [{ todo: newTodo, errors, loading }, createTodo]
}

export default useCreateTodoApi
