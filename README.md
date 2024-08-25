# Todo API - AWS Lambda Function

This project is a simple Todo API implemented as an AWS Lambda function. It provides endpoints to create, read, update, and delete todo items.

Endpoints
* Get all todos: GET /todos
* Get a specific todo: GET /todo?id={id}
* Add a new todo: POST /todo (Body: { "task": "Task description" })
* Update todo status: PUT /update?id={id}
* Delete a todo: DELETE /remove?id={id}
