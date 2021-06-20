# Gymstation API

## Description
The project is intended to help people who want to start exercising but end up losing interest when they try to do everything on their own, this app will help the user to find nearby people who match their profile to exercise or play sports, the app will also help the user by giving information about fat calculations and body mass.

## Techs
The technologies used in the back end of this project are diverse, starting with the database, only one database was used (postgres),
to make the database communication typeorm was used, to separate the responsibilities three docker containers were made, one for the development database, one for the test database and the last one for the project files.
To carry out the tests, jest was used, the API routes were made using express and the authentication routes use the json web token to provide the user with two tokens, one for access and one for refresh

## Getting Started
1 - clone the repository on your machine with `git clone https://github.com/codestation-boys/gymstation-backend`.  
2 - when opening the project install the dependencies with `npm install` or `yarn`.  
3 - add the port you want to the `.env` file.  
4 - after you finish installing the dependencies, you can boot with `docker-compose up`.  
5 - Should appear `server is running...` in your terminal  
6 - if everything went well, make a `POST` request for `http://localhost:{port}/accounts` with yout user informations.  

## Routes
This api has public routes and private routes, then there are the categories each route fits into.
- ### Accounts
  `/accounts`
     - `POST` - User creation  
    **Request Example**
        - Body
          ```json
            {
              "name": "Any Name",                       
              "email": "name@mail.com",                 
              "password": "123456",                     
              "gender": "male",
              "date_birth": "2021-06-15T16:51:15.837Z"  
            }
          ```
        **Responses Example**
        - Created - `201`  
        ```
        No Body Return for response
        ```
        - Bad Request - `400`
        ```json
          {
            "message": "Necessary all fields"
          }
        ```
        ```json
          {
            "message": "Necessary correct field types"
          }
        ```
        - Conflict - `409`
        ```json
          {
            "message": "User already exists"
          }
        ```
  `/accounts/login`
     - `POST` - User authentication  
    **Request Example**  
        - Header
          ```json
            {
              "authorization": "Basic bm9tZUBtYWlsLmNvbToxMjM0NTY="

              // Basic Auth
            }
          ```
        **Responses Example**
        - OK - `200`  
        ```json
        {
          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjM5NjIyNjIsImV4cCI6MTYyMzk2MzQ2Miwic3ViIjoiMTRhMGNiNTYtYjA5Ny00ZmFkLTg2NTAtNjI0YzYzMTc0ZWI2In0.e4WkZKBA-MGsb37GDkObltCYJHG6htBQq8pS63Ps2z4",
          "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjM5NjIyNjIsImV4cCI6MTYyNjU1NDI2Miwic3ViIjoiMTRhMGNiNTYtYjA5Ny00ZmFkLTg2NTAtNjI0YzYzMTc0ZWI2In0.6ddMi-0scwlBwYEElMWQqd8If8Ls2A9FXHxP3sFDHZQ",
          "user_data": {
            "email": "nome@mail.com",
            "name": "Nome Qualquer",
            "gender": "male",
            "date_birth": "2021-06-15T16:51:15.837Z"
          }
        }
        
        ```
        - Bad Request - `400`
        ```json
          {
            "message": "Necessary authorization field"
          }
        ```
        ```json
          {
            "message": "Authorization must be a hash"
          }
        ```
        ```json
          {
            "message": "Necessary Basic Authentication"
          }
        ```
        - Unautorized - `401`
        ```json
          {
            "message": "Invalid email or/and password"
          }
        ```
  `/accounts/refresh-token`
     - `POST` - Refresh user token  
    **Request Example**  
        - Body
          ```json
            {
              "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjM5NTUxNzgsImV4cCI6MTYyNjU0NzE3OCwic3ViIjoiYjQxZGQ0YjUtZGExMS00MWYyLTgwMWMtMDZhMDExMGU3ZGIyIn0.uq4VAA-9NKvl76JLK6TB8HGkj8p-tq74OPR9ClhFr3k"
            }
          ```
        **Responses Example**
        - OK - `200`  
        ```json
        {
          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjM5NTU1MjAsImV4cCI6MTYyMzk1NTU1MCwic3ViIjoiYjQxZGQ0YjUtZGExMS00MWYyLTgwMWMtMDZhMDExMGU3ZGIyIn0.48OQ_3G5PWZAacspWZHOPp5L4On5aIgSPQ3bx0PZ0zI",
          "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjM5NTU1MjAsImV4cCI6MTYyNjU0NzUyMCwic3ViIjoiYjQxZGQ0YjUtZGExMS00MWYyLTgwMWMtMDZhMDExMGU3ZGIyIn0.0dhlT9tFe5Cp072lSAIyB67IHGySf1ULaCNOTz26WHE",
          "user_data": {
            "email": "nome@mail.com",
            "name": "Nome Qualquer",
            "gender": "male",
            "date_birth": "2021-06-15T16:51:15.837Z"
          }
        }
        
        ```
        - Bad Request - `400`
        ```json
          {
            "message": "Necessary correct field types"
          }
        ```
        - Unautorized - `401`
        ```json
          {
            "message": "Invalid refresh token"
          }
        ```
        - Not Found - `404`
        ```json
          {
            "message": "Refresh token not found"
          }
        ```
        ```json
          {
            "message": "User not found"
          }
        ```
  `/accounts/match-profile`
     - `POST` - Create match user profile  
    **Request Example**  
        - Body
          ```json
            {
              "objective": "Lose weight",
              "physical_activity": "Bodybuilding"
            }
          ```
        - Header
          ```json
            {
              "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjM5NTU1MjAsImV4cCI6MTYyMzk1NTU1MCwic3ViIjoiYjQxZGQ0YjUtZGExMS00MWYyLTgwMWMtMDZhMDExMGU3ZGIyIn0.48OQ_3G5PWZAacspWZHOPp5L4On5aIgSPQ3bx0PZ0zI"
              
              // Bearer Token
            }
          ```
        **Responses Example**
        - Created - `201`  
        ```
        No Body Return for response
        ```
        - Unautorized - `401`
        ```json
          {
            "message": "Token missing"
          }
        ```
        ```json
          {
            "message": "Necessary Bearer Authentication"
          }
        ```
        - Conflict - `409`
        ```json
          {
            "message": "User already create match profile"
          }
        ```
     - `GET` - Get match user profile  
    **Request Example**  
        - Header
          ```json
            {
              "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjM5NTU1MjAsImV4cCI6MTYyMzk1NTU1MCwic3ViIjoiYjQxZGQ0YjUtZGExMS00MWYyLTgwMWMtMDZhMDExMGU3ZGIyIn0.48OQ_3G5PWZAacspWZHOPp5L4On5aIgSPQ3bx0PZ0zI"
              
              // Bearer Token
            }
          ```
        **Responses Example**
        - OK - `200`  
        ```json
        {
          "physical_activity": "Bodybuilding",
          "objective": "Lose weight",
          "updated_at": "2021-06-20T15:08:41.298Z",
          "created_at": "2021-06-20T15:08:41.298Z",
          "user": {
            "name": "Nome Qualquer",
            "email": "nome@mail.com",
            "gender": "male"
          }
        }
        ```
        - Unautorized - `401`
        ```json
          {
            "message": "Token missing"
          }
        ```
        ```json
          {
            "message": "Necessary Bearer Authentication"
          }
        ```
        - Not Found - `404`
        ```json
          {
            "message": "Match user profile not found"
          }
        ```
- ### Statistics
  `/statistics/measures`
     - `POST` - Add user measures  
    **Request Example**
        - Body
          ```json
            {
              "height": 1.88, // m
              "weight": 75.5, // kg
              "waist": 78,    // cm
              "neck": 37      // cm
            }
          ```
        - Header
          ```json
            {
              "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjM5NTU1MjAsImV4cCI6MTYyMzk1NTU1MCwic3ViIjoiYjQxZGQ0YjUtZGExMS00MWYyLTgwMWMtMDZhMDExMGU3ZGIyIn0.48OQ_3G5PWZAacspWZHOPp5L4On5aIgSPQ3bx0PZ0zI"
              
              // Bearer Token
            }
          ```
        **Responses Example**
        - Created - `201`  
        ```
        No Body Return for response
        ```
        - Unautorized - `401`
        ```json
          {
            "message": "Token missing"
          }
        ```
        ```json
          {
            "message": "Necessary Bearer Authentication"
          }
        ```
        - Bad Request - `400`
        ```json
          {
            "message": "Necessary all fields"
          }
        ```
        ```json
          {
            "message": "Necessary correct field types"
          }
        ```
        - Not Found - `404`
        ```json
          {
            "message": "User not found"
          }
        ```
     - `GET` - Get measures historic 
    **Request Example**
        - Header
          ```json
            {
              "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjM5NTU1MjAsImV4cCI6MTYyMzk1NTU1MCwic3ViIjoiYjQxZGQ0YjUtZGExMS00MWYyLTgwMWMtMDZhMDExMGU3ZGIyIn0.48OQ_3G5PWZAacspWZHOPp5L4On5aIgSPQ3bx0PZ0zI"
              
              // Bearer Token
            }
          ```
        **Responses Example**
        - OK - `200`  
        ```json
          {
            "unitsMeasure": {
              "height": "m",
              "weight": "kg",
              "waist": "cm",
              "neck": "cm"
            },
            "historicMeasures": [
              {
                "height": "1.88",
                "weight": "75.5",
                "waist": "78",
                "neck": "37",
                "created_at": "2021-06-17T21:17:52.770Z"
              },
              {
                "height": "1.88",
                "weight": "75.5",
                "waist": "78",
                "neck": "37",
                "created_at": "2021-06-17T21:36:23.512Z"
              }
            ]
          }
        ```
        - Unautorized - `401`
        ```json
          {
            "message": "Token missing"
          }
        ```
        ```json
          {
            "message": "Necessary Bearer Authentication"
          }
        ```
  `/statistics/calculations`
     - `GET` - Get calculations historic  
    **Request Example**
        - Header
          ```json
            {
              "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjM5NTU1MjAsImV4cCI6MTYyMzk1NTU1MCwic3ViIjoiYjQxZGQ0YjUtZGExMS00MWYyLTgwMWMtMDZhMDExMGU3ZGIyIn0.48OQ_3G5PWZAacspWZHOPp5L4On5aIgSPQ3bx0PZ0zI"
              
              // Bearer Token
            }
          ```
        **Responses Example**
        - OK - `200`  
        ```json
         {
          "unitsMeasure": {
            "fat_mass": "kg",
            "lean_mass": "kg",
            "body_mass_index": "kg/m²",
            "body_fat_percentage": "%"
          },
          "historicCalculations": [
            {
              "fat_mass": "7.5",
              "lean_mass": "68",
              "body_mass_index": "21.4",
              "body_fat_percentage": "9.94",
              "created_at": "2021-06-17T21:17:52.839Z"
            },
            {
              "fat_mass": "7.5",
              "lean_mass": "68",
              "body_mass_index": "21.4",
              "body_fat_percentage": "9.94",
              "created_at": "2021-06-17T21:36:23.559Z"
            }
          ]
        }
        ```
         - Unautorized - `401`
        ```json
          {
            "message": "Token missing"
          }
        ```
        ```json
          {
            "message": "Necessary Bearer Authentication"
          }
        ```
  `/statistics/localization`
     - `POST` - Create user localization  
    **Request Example**
        - Body
          ```json
            {
              "latitude": -27.496735899999997,
              "longitude": -50.1241968
            }
          ```
        - Header
          ```json
            {
              "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjM5NTU1MjAsImV4cCI6MTYyMzk1NTU1MCwic3ViIjoiYjQxZGQ0YjUtZGExMS00MWYyLTgwMWMtMDZhMDExMGU3ZGIyIn0.48OQ_3G5PWZAacspWZHOPp5L4On5aIgSPQ3bx0PZ0zI"
              
              // Bearer Token
            }
          ```
        **Responses Example**
        - Created - `201`  
        ```
        No Body Return for response
        ```
        - Unautorized - `401`
        ```json
          {
            "message": "Token missing"
          }
        ```
        ```json
          {
            "message": "Necessary Bearer Authentication"
          }
        ```
        ```json
          {
            "message": "User need match profile"
          }
        ```
         - Conflict - `409`
        ```json
          {
            "message": "User already registered localization"
          }
        ```
     - `GET` - Get users that match nearby profiles  
    **Request Example**
        - Header
          ```json
            {
              "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjM5NTU1MjAsImV4cCI6MTYyMzk1NTU1MCwic3ViIjoiYjQxZGQ0YjUtZGExMS00MWYyLTgwMWMtMDZhMDExMGU3ZGIyIn0.48OQ_3G5PWZAacspWZHOPp5L4On5aIgSPQ3bx0PZ0zI"
              
              // Bearer Token
            }
          ```
        **Responses Example**
        - Created - `201`  
        ```json
        {
          "matchedNearProfiles": [
            {
              "physical_activity": "Bodybuilding",
              "objective": "Lose weight",
              "user": {
                "name": "Nome Qualquer",
                "email": "nome@mail.com",
                "gender": "male"
              }
            },
            {
              "physical_activity": "marathon",
              "objective": "get out of a sedentary lifestyle",
              "user": {
                "name": "Nome Qualquer 2",
                "email": "nome@mail2.com",
                "gender": "female"
              }
            }
          ]
        }
        ```
        - Unautorized - `401`
        ```json
          {
            "message": "Token missing"
          }
        ```
        ```json
          {
            "message": "Necessary Bearer Authentication"
          }
        ```
        ```json
          {
            "message": "User needs localization"
          }
        ```
         - Not Found - `404`
        ```json
          {
            "message": "User match profile not found"
          }
        ```  
        
## Future implementations
- Deploy with AWS
- Integration with Google maps API
