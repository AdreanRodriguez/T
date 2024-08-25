const todos = [
  { id: 1, task: "Something is wrong", done: false },
  { id: 2, task: "Investigation phase", done: false },
  { id: 3, task: "No way I can fix this", done: false },
  { id: 4, task: "Imposter syndrome kicks in", done: false },
  { id: 5, task: "Questions career choice", done: false },
  { id: 6, task: "Questions life choices", done: false },
  { id: 7, task: "Oh, never mind! I made a typo in the code", done: false },
  { id: 8, task: "I fixed it", done: false },
  { id: 9, task: "I am a good developer", done: false },
  { id: 10, task: "I can do anything", done: false },
];

exports.handler = async (event) => {
  const { path, method } = event.requestContext.http;
  const queryParams = event.queryStringParameters;

  let response = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  };

  
  if (method === "GET" && path === "/todos") {
    response = {
      statusCode: 200,
      body: JSON.stringify({ message: "All todos", todos: todos }),
    };
  }


  
  if (method === "GET" && path === "/todo") {
    const foundTodo = todos.filter( (todo) => todo.id === parseInt(queryParams.id) );

    if (foundTodo) {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Searched todo found",
          foundTodo: foundTodo,
        }),
      };
    } else {
      response = {
        statusCode: 404,
        body: JSON.stringify({ message: "Todo not found" }),
      };
    }
  }



  if (method === "POST" && path === "/todo") {
    const { task } = JSON.parse(event.body);

    if (!task) {
      response = {
        statusCode: 400,
        body: JSON.stringify({ message: "Task is required" }),
      };
    } else {
      const addTodo = {
        id: todos[todos.length - 1].id + 1,
        task: task,
        done: false,
      };

      todos.push(addTodo);

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Succesfully added new todo",
          addTodo: addTodo,
        }),
      };
    }
  }


  
  if (method === "PUT" && path === "/update") {
    const updateTodo = todos.find( (todo) => todo.id === parseInt(queryParams.id) );

    if (updateTodo) {
      updateTodo.done = !updateTodo.done;

      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: "Succesfully updated todo",
          todo: updateTodo,
        }),
      };
    } else {
      response = {
        statusCode: 404,
        body: JSON.stringify({ message: "Todo not found" }),
      };
    }
  }


  
  if (method === "DELETE" && path === "/remove") {
    const foundTodo = todos.find( (todo) => todo.id === parseInt(queryParams.id) );

    if (foundTodo) {
      const indexPosition = todos.findIndex( (todoItem) => todoItem === foundTodo );
      const removed = todos.splice(indexPosition, 1);

      response = {
        statusCode: 202,
        body: JSON.stringify({
          message: "Successfully deleted todo",
          removedObject: removed,
          AtIndexPosition: indexPosition,
        }),
      };
    } else {
      response = {
        statusCode: 404,
        body: JSON.stringify({ message: "Todo not found" }),
      };
    }
  }

  return response;
};
