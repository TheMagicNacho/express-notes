# express-notes

## Features
- API Routes
- Accept Params
- Postgress Attachment
- TDD capable
- Environment Variables
- Handle Cookies

## Packages to install
```npm i postgres pg express body-parser cookie-parser knex nodemon supertest dotenv jest ```

- **postgres** allows for connection with postgres DB 
- **nodemon** allows server to run as daemon
- **express** the API framework to answer HTTP requests
- **body-parser** parse bodies
- **cookie-parser** parse cookies
- **knex** connect API to DB
- **superTest** allows testing with API
- **jest** unit test suit
- **dotenv** allows for usage of environment variables 



## Snippits / Paterns
### Params
- in routes use ' : ' to denote variables
- to consume the param ```req.params.<variable>```


## Configuration
### dotenv
ref: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
1. make a file in root title .env
2. add .env to the gitignore
syntax
    ```js
    import 'dotenv/config'
    ```

### Postgres Server
- This is not part of the code.
- You need to spin out the postgress server
- You can do this all through WSL. No need to switch to Powershell.
1. Get the docker image

    ```docker pull postgres```
2. Ensure your containers have a volume directory
   
    ```mkdir -p $HOME/docker/volumes/postgres```

3. Start a docker container instance
   
    ```docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres```

4. Find the id of your container:

    ```docker ps -a```

5. Enter the shell of your container

    ```docker exec -it <PSQL-Container-ID> bash```

6. Create a database to work with

    ```createdb -U postgres <db-name>```

7. Enter the postgres CLI

    ```psql -U postgres```

8. connect to your new database

    ```\c <db-name>```



### Nodemon

- Add the following script to the packages.js

    ```"start": "nodemon index.js"```


### Jest
- Change the package.json to allow JEST to use modules.

    ```"test": "NODE_OPTIONS=--experimental-vm-modules npx jest",```

- Create the spec file:  
    ```app.test.js```

### Kenex
*Note: this repo exposes the .env file for educational purposes. It is best practice to add .env to gitignore*
1. Init the repo
    
    ```npx knex init```

2. postgres connection string format: ``` postgres://USER:PASS@HOST:PORT/DB_NAME```

3. Create a migration:
    ``` npx knex migrate: make MIGRATION_NAME ```





## Workflow
1. Init the Repo
2. Import required packages
3. Create the index.js (this is the entry point)
4. Create the app.js (this is the routing)
5. Create Specs


