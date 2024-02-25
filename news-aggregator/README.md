## Assignment 2
### News Aggregator  API

#### Project Brief- RESTful API for news based on user preferences.

#### Project Description

In this project, A RESTful API using Node.js, Express.js, and NPM packages is built. This application implements user based login, register,  and news retrival based on preferences. 


A RESTful API with the following endpoints has been implemented:

```
POST /users/signup: Register a new user.

POST /users/login: Log in a user.

GET /preferences: Retrieve the news preferences for the logged-in user.

PUT /preferences: Update the news preferences for the logged-in user.

GET /news: Fetch news articles based on the logged-in user's preferences.

```
#### Prequisties
* Run ``` npm install ``` to install all the required modules. 
* Create environment variables ```API_SECRET``` \& ```API_KEY``` in the .env file in the root directory.
#### Commands
* Debug - ``` npx nodemon --inspect-brk app.js ```
* Without debug -  ```nodemon app.js``` or ```node app.js```
  
Validations have been done accordingly to handle all the client-side and server-side issues with proper status codes.

### Test Results
![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/d3a69661-b119-4161-ac2c-5f9ad2a56efb)

