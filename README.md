# Farm to Table Thesis
Final Project for Operation Spark
Its Uber for CSA Subscriptions
User can sign up for a season and access/alter subscription information
Employees can access delivery routes and packing lists
And Farmers can manage it all in one easy to use application

# Deployed Instance
Url: http://ec2-54-200-56-17.us-west-2.compute.amazonaws.com:5555/
SERVER_URL=http://ec2-54-200-56-17.us-west-2.compute.amazonaws.com:5555/

# Team ACE
Product Owner:
Scrum Master:
Development Team: Rodolfo, Rene, John, Santo, Murphy

## Application Walk Through

The idea is to ...

When a user opens the application they will be brought to the homepage where they will see a ...

Located at the top left of every page is a navigation burger menu which contains {x} options that will quickly navigate the user to various features of the application. From left to right are the ...

To sign-up for a CSA subscription the user should navigate to the subscriptions page where they will ...

On the orders page the user can ...

On the events page users can ...


## Tech
1. Cloudinary - Image hosting library
2. React-Router - Router library
3. PostgreSQL - Database
4. Sequelize - ORM
5. React - Framework
6. Axios - http Client
7. TypeScript - javaScript SuperSet
8. Node.js - Runtime Environment
9. Express - Server
10. Husky - Pre-Commit Git Hooks
11. eslint - Linter
12. Webpack - Module Bundler
13. Material UI - Front-end styling library
14. Passport/Google OAuth - Authentication
15. PGAdmin - Cloud Database
16. Github Actions - Continual Integration
17. AWS - Deployment


Dev Setup:
## Environment Variables Needed
1. LOCAL_PORT:
2. DB_PORT:
3. RDS_URL:
4. DB_NAME:
5. DB_PASSWORD:
6. DB_USERNAME:

## Google OAuth
Google Oauth requires a google cloud account. First create your account and then navigate to the developer console. Go to google API and create a clientID and clientSecret. This goes inside the .env file.

## Installation/Start-up
1. First fork the repo and clone it to your local machine.
2. Collect all env keys
3. Run npm install to install all dependencies
4. Run npm run dev to start Webpack
5. Run npm start to run the server