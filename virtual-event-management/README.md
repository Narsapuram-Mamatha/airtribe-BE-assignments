## Assignment 3
### Backend System for a Virtual Event Management Platform 

#### Project Brief- A backend system for a virtual event management platform focusing on user registration, event scheduling, and participant management

#### Project Description:

In this project, A RESTful API using Node.js, Express.js, and NPM packages is built. The API will allow users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. The file system is used as memory. The API is tested using Postman. 

#### BASIC UML:
![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/13ce16f3-440d-452f-b9fd-4a79e66caf75)
   
#### Actors: 
We have 3 main actors.  
        1. Admin: The person responsible for adding new organizers to the application.   
        2. Organinzer: The person responsbile for adding, modifying events.  
        3. Participant/User: The person who can regsiter for events. 

#### Basic SCHEMA:
![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/896eb9b0-980a-468e-8a76-ba5f29cfb5ec)

##### User schema:
```json
{    
    "id":3, 
    "name": "John Doe", 
    "email": "1234@example.com", 
    "password": "$2b$08$Uj1jzSD6kotPzyTY2Fdcke3TOU/7zoskO97Az522Qy1ikbM9WquGa",
    "role": "organizer" 
  
}
```
##### Event schema:
```json
{    
    "id": 3,
    "name": "Event 3",
    "startDate": "2024-03-17",
    "startTime": "10:00",
    "endDate": "2024-03-17",
    "endTime": "13:00",
    "seats": 30,
    "category": "Technical"
  
}
```
##### Event Registration schema:
```json
{    
    "regid": 2,
    "userid": 8,
    "eventid": "1",
    "email": "nmamatha1808@example.com",
    "contact": "1234567890",
    "status": "registered"
  
}
```
A complete system with the following endpoints has been implemented:

```
POST /auth/signup- register for user.
POST /auth/login- login for admin/organizer/user.
GET /admin/organizers-  Retrieve all organizers.
POST /admin/organizers- Register new organizer.
PUT /organizers/password- Update password for organizers.
GET /organizers/events- List of events.
POST /events: Create a new event.
PUT /events/:eventId- Update Event Details.
GET /users/events- Get available events.
GET /users/registrations- Get list of events regsitered.
POST /events/:eventId/registration- Register for a event.
PUT /events/registrations/:registrationId- Update registration Details. 
DELETE /events/registrations/:registrationId- Cancel registration.

``` 
Validations have been done accordingly to handle all the client-side and server-side issues with proper status codes.

