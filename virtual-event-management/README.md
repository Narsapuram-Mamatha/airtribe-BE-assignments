# airtribe-BE-assignments
Assignments related to Airtribe-Backend-Launchpad
## Assignment 3
### Backend System for a Virtual Event Management Platform 

#### Project Brief- A backend system for a virtual event management platform focusing on user registration, event scheduling, and participant management

#### Project Description:

In this project, A RESTful API using Node.js, Express.js, and NPM packages is built. The API will allow users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. The tasks should have a title, description, and a flag for completion status. The API is tested using Postman.

#### User schema:
```json
{    
    "id":3, 

    "name": "John Doe", 

    "email": "1234@example.com", 

    "password": "$2b$08$Uj1jzSD6kotPzyTY2Fdcke3TOU/7zoskO97Az522Qy1ikbM9WquGa",
    
    "role": "organizer" 
  
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
