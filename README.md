# jwt-express-react-demo

A two part of demo with a frontend and api.




## Functionality

- Sign up
- Log in
- [Logged in] Log out
- [Logged in] Change password
- List of all users in the application 
- Show all users that are currently in the system
- jwt token authentication with passport

## REST endpoints
Features the following REST endpoints:

- /signup

    Sign up to the system (username, password)
    
- /login

    Logs in an existing user with a password
    
- **/me**

    Get the currently logged in user information
    
- **/me/update-password**

    Update the current user's password
    
- /user/:username/


### Development
Mongodb should be installed at machine with 27017 port enabled
- Run `npm start` in `frontend/`, server will run at `http://localhost:3000`
- Run `npm start` in `backend/`, server will run at `http://localhost:8000`
