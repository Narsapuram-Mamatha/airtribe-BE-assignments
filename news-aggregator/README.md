# airtribe-BE-assignments
Assignments related to Airtribe-Backend-Launchpad
## Assignment 2
### News-Aggregator API

#### Project Brief- RESTful API for a simple task manager application.

#### Project Description:

In this project, A RESTful API using Node.js, Express.js, and NPM packages is built. The API will allow users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. The tasks should have a title, description, and a flag for completion status. The API is tested using Postman.

#### Task schema:
```json
{    
    "id": 2, 
    
    "title": "Create a new project", 
  
    "description": "Create a new project using Magic", 
  
    "completed": false 
  
}
```

A RESTful API with the following endpoints has been implemented:

```
GET /tasks: Retrieve all tasks.

GET /tasks/:id: Retrieve a single task by its ID.

POST /tasks: Create a new task.

PUT /tasks/:id: Update an existing task by its ID.

DELETE /tasks/:id: Delete a task by its ID.

``` 
Validations have been done accordingly to handle all the client-side and server-side issues with proper status codes.

### Test Results
![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/a277c1cf-2910-49af-a4ec-69951b215f54)
