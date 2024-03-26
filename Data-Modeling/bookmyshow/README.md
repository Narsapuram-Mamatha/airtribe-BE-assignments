# Assignment 4
## Bookmyshow


### Project Brief
Bookmyshow is a ticketing platform where you can book tickets for a movie show. The image attached represents that for a given theatre we can see the next 7 dates. As one chooses the date, we get a list of all shows running in that theatre along with the show timings.  

![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/6a6850df-089d-40ff-b5ef-084ccb2bf20c)

#### Requirements
- MySQL
- Create a database named bookmyshow or run the following commands
  ```
  create database bookmyshow;
  use database bookmyshow;
  ```

#### Sub-Task 1
List all the entities, their attributes  the table structures for the scenario mentioned in the previous slide.  
SQL queries required to create these tables along with a few sample entries are attached. 

##### Entities
  1. Movie              
  2. MovieShow       
  3. Screen     
  4. Theatre  
     
##### ER Diagram
![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/083e59d2-8479-424b-ace7-154236cdcdfd)

To create the entities run the queries from ``` table-creation.txt ```

![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/f7d0fb14-4774-4a31-9bd6-cf14720dc417)

##### Attributes of each Entity
1. Movie
   ![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/36537e6d-65ca-431d-938a-1776010af43d)
2. MovieShow
   ![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/c17d41f2-91ee-4dd0-9c4a-80069b0867bd)
3. Screen
   ![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/8723ca89-5e1f-4aa7-ac82-8fe240d34b84)
4. Theatre
   ![image](https://github.com/Narsapuram-Mamatha/airtribe-BE-assignments/assets/149604307/5e988774-8be3-4e65-ab98-6126c0663276)

##### Run the ```insert-records.txt``` file to insert some sample records into the tables.
 
#### Sub-Task 2
Query to list down all the shows on a given date at a given theatre along with their respective show timings.
Run the select Query mentioned in the ``` query.txt``` file.

