# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.
## Installation and Setup guide

1- Clone the repo
2- Change directory to the cloned repo
3- Run ```npm install```
4- You have to create two files to run the server and connect to database:
4.1- Create a ```.env``` file in the project root with the following environment variables
```bash
POSTGRES_TEST_DB=postgres_test
POSTGRES_HOST=127.0.0.1
POSTGRES_USER=${POSTGRES_USERNAME}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB=postgres_dev
ENV=dev
BCRYPT_PASSWORD=${BCRYPT_PASSWORD}
SALT_ROUNDS=10
TOKEN_SECRET=${JWT_TOKEN_SECRET}
```
```${POSTGRES_USERNAME}```: A username that will be used in connecting/migrating to the database
```${POSTGRES_PASSWORD```: A password for postgres
```${BCRYPT_PASSWORD}```: A password that is unqiue for the database to hash and encrypt a user's password
```${JWT_TOKEN_SECRET}```: Token secret unique for the routers in the API to verify and authenticate requests
4.2- Createa a ```database.json``` file in the project root with the following variables:
```bash
{
    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "postgres_dev",
      "user": ${POSTGRES_USER},
      "password": ${POSTGRES_PASSWORD}
    },
    "test": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "postgres_test",
      "user": ${POSTGRES_USER},
      "password": ${POSTGRES_PASSWORD}
    }
  }
```
```${POSTGRES_USER}``` and ```${POSTGRES_PASSWORD}``` are the same as in 4.1
## Running The Application/Server
After installation, you can the server using of two commands:
- ```npm run build && ./dist/server.js```
or
```npm run start```
The server start at ```localhost:8000```

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!
