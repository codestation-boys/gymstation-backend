# Gymstation API

## Description
API description...

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
        - Conflict - `409`
        ```json
          {
            "message": "User already exists"
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
        - Unautorized - `401`
        ```json
          {
            "message": "Invalid email or/and password"
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
            "message": "Necessary Basic Authentication"
          }
        ```
        ```json
          {
            "message": "Authorization must be a hash"
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
        - Not Found - `404`
        ```json
          {
            "message": "User not found"
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
