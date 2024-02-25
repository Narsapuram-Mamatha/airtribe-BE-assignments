# Assignment- 2
###### Topics covered 
* Authentication
* Authorization
* External API calls using - ```axios```
* Tokenisation
* Encryption
## News Aggregator  API

### Project Brief- RESTful API for news based on user preferences.

  
### Project Description

In this project, A RESTful API using Node.js, Express.js, and NPM packages is built. 

This application implements user based login, signup,  and news retrival based on preferences. 


A RESTful API with the following endpoints has been implemented:
#### Signup 
A user can signup themselves using the post call ```POST /users/signup```.  
###### Highlights
* Hashing of password has been implemented.
* All fields are marked as important.
* All the users data is maintained in the data folder in Users.json file.  
Example: 
![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/86c8856f-2f11-4883-b51f-519b93dacff7)


#### Login 
A user can login using the post call ```POST /users/login```. 
###### Highlights
* Tokenisation has been implemented for authorization rather than using password.  
Example: 
![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/62b41e42-00e7-4a41-b715-71cb64147d5f)


#### Preferences 
A user can view their preferences using the get call ```GET users/preferences```.   
###### Highlights
* The authorization token has to be passed as header. 

Example: 
![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/00abb526-566b-4628-a95a-cbab438413a5)


#### Update Preferences 
A user can update their preferences using the put call ```PUT users/preferences```.The authorization token has to be passed as header.     
Example: 
![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/8c3ece7c-9b8c-4cc7-b198-89b31750a94d)


#### News 
News based on the user preferences can be fetched with get call ```GET /news```.   
###### Highlights
* The API for fetching news is ```https://newsapi.org/v2/everything```.
* The  users preferences are passed as parameters along with the APIKEY.
* Find the detailed implementation in - `src/helpers/NewsHelper.js` file.
* Token has to be passed as header for authorization.  
Example: 
![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/19756368-7e26-4d19-b536-27ea80fe80c2)

### Prequisites
* Run ``` npm install ``` to install all the required modules. 
* Create environment variables ```API_SECRET``` \& ```API_KEY``` in the .env file in the root directory.
* Get your API key from ```https://newsapi.org/``` by creating a new account if not exists.  
### Commands
* Debug - ``` npx nodemon --inspect-brk app.js ```
* Without debug -  ```nodemon app.js``` or ```node app.js```
  
Validations have been done accordingly to handle all the client-side and server-side issues with proper status codes.

### Test Results
![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/d3a69661-b119-4161-ac2c-5f9ad2a56efb)

