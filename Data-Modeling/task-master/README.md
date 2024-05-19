# Assignment 5
## TaskMaster: A Collaborative Task Tracking System

### Project Brief
Backend system for a task tracking and management application that facilitates collaboration and organization within teams or projects. The application should allow users to create, assign, and track tasks and collaborate with team members through comments and attachments.

### Project Description:

This project has built a RESTful API using Node.js, Express.js, MongoDB, and NPM packages. The API will allow users to perform CRUD operations (Create, Read, Update) on tasks. MongoDB system is used as memory. The API is tested using Postman. 


##### Task schema:
```sql
{    
   _id: ObjectId('66449f768aab28426cd8d737'),
    title: 'Write a blog post',
    description: 'This task is for Blog Post',
    completed: true,
    dueDate: ISODate('2024-05-19T00:00:00.000Z'),
    assignedUsers: [ ObjectId('66398faa43ad1ff23c2202d8') ],
    comments: [
      {
        content: 'This is the 5 comment on the task.',
        timestamp: ISODate('2024-05-17T01:33:01.417Z'),
        _id: ObjectId('6646b3cd96d4a810714bdc5c')
      },
      {
        content: 'This is the 6 comment on the task.',
        timestamp: ISODate('2024-05-17T01:35:16.784Z'),
        _id: ObjectId('6646b454e4d35cd6cf20497a')
      },
      {
        content: 'This is the 7 comment on the task.',
        timestamp: ISODate('2024-05-17T01:36:42.292Z'),
        _id: ObjectId('6646b4aae4d35cd6cf204984')
      },
      {
        content: 'This is the 8 comment on the task.',
        timestamp: ISODate('2024-05-17T01:42:03.616Z'),
        _id: ObjectId('6646b5ebeb8fa43229f7d24e')
      }
    ],
    files: [
      {
        fileName: '1715913440699-file1.txt',
        url: '/uploads/1715913440699-file1.txt',
        _id: ObjectId('6646c2e090b7b49b38f10f12')
      },
      {
        fileName: '1715913552044-file1.txt',
        url: '/uploads/1715913552044-file1.txt',
        _id: ObjectId('6646c35090b7b49b38f10f22')
      }
    ],
    teamId: ObjectId('6642e8566d1b4d2dfa803c5f')
}
```
##### Team schema:
```sql
{  _id: ObjectId('6642e8566d1b4d2dfa803c5f'),
    name: 'My Awesome Team',
    description: 'A team for collaborative tasks',
    owner: ObjectId('6641e720637d63908ee1b34a'),
    members: [ ObjectId('6641e6c0dea4fe6edc449087') ]
}
```

##### User schema:
```sql
{
   _id: ObjectId('6641e6c0dea4fe6edc449087'),
    name: 'Jessie',
    email: 'team@gmail.com',
    password: '$2b$08$lXIv6Mt09gbneM/x9/SRK.pJArsLfUZoSxbZPLYprdhE1eI4GZgq6',
}
```

A complete system with the following endpoints has been implemented:

```
POST /signup - User Sign-up
POST /login - User Login
PATCH /users/update - Update user profile
POST /users/tasks - Create Tasks
GET /users/tasks - Get all Tasks
GET /users/tasks/:id - Get task by ID
PATCH /users/tasks/:id - Update task by Id
PATCH /users/tasks/:id/completed - Update task completed by Id
PATCH /users/tasks/:id/uploads -  Upload file attachments
POST /users/teams - Create Teams
```
### Prerequisites
* Run ``` npm install ``` to install all the required modules. 
* Create environment variables ```API_SECRET``` \& ```API_KEY``` \& ```MONGODB_URI``` in the .env file in the root directory.
* Get your API key from ```https://newsapi.org/``` by creating a new account if not exists.  
### Commands
* Debug - ``` npx nodemon --inspect-brk app.js ```
* Without debug -  ```nodemon app.js``` or ```node app.js```
Validations have been done to handle all the client-side and server-side issues with proper status codes.
