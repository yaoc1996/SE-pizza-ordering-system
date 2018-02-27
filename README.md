# SE-pizza-ordering-system

## Setup

- Database (download PostgreSQL and set up a user and databse for development)
  + Create User (user: se_app, password: se_app)
    + $ `createuser -P -s -e se_app`

  + Create Databbase
    + $ `createdb -h localhost -U se_app se_app_development`

- Install dependencies
  + frontend 
    + cd `frontend/pizza-ordering-system && npm install`
  
  + backend
    + cd `backend/server && npm install`

- Start development server
  + frontend
    + cd `frontend/pizza-ordering-system && npm start`
  
  + backend
    + cd `backend/server && npm start`

## Explanations

- frontend `/frontend/pizza-ordering-system`
  + `/public`
    + This is generated by create-react-app.
    + DO NOT MODIFY unless you are adding external CDN libraries.
  
  + `/src`
    + Source folder for the React client.
    + `index.js`
      + This is the entry point of the React app. DO NOT MODIFY.

- backend `/backend/server`
  + `/config/config.json`
    + This file contains the credentials for connecting to your postgres database.
    + Make sure these details match your DB setup.

  + `/controllers`
    + This is stores all the logic handling URL routes and business logic for the app.
  
  + `/models`
    + This is stores all the sequelize model definitions.

  + `/syncs`
    + This stores all the files that handle sync logic.

  + `/server.js`
    + This is the entry point of the database server client.
    + This file loads up the controllers, models, and other required modules.