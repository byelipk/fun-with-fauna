const sendQuery = require("./utils/send-query")

const CREATE_TODO = `
  mutation($text: String!) {
    createTodo(data: {
      text: $text, 
      completed: false,
    }) {
      _id
      _ts
      text
      completed
    }
  }
`

exports.handler = async event => {
  const unsanitizedUserInput = JSON.parse(event.body)

  const { data, errors } = await sendQuery(CREATE_TODO, {
    text: unsanitizedUserInput.text,
  })

  if (errors) {
    return { statusCode: 500, body: JSON.stringify(errors) }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ newTodo: data.createTodo }),
  }
}
