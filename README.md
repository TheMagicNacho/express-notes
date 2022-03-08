# express-notes
This document and repo is ment to serve as a guide and framework to building an API server.
The syntax in this repo uses ES6 which is contrary to majority of the documentation.

## Features
- API Routes
- Accept Params
- Postgress Attachment
- TDD capable
- Environment Variables
- Handle Cookies


## Workflow
1. Init the Repo
2. Import required packages
3. Create the index.js (this is the entry point)
4. Create the app.js (this is the routing)
5. Create the Database
6. Configure testing
7. Configure express
8. Configure knex


## Packages to install
```npm i postgres pg express cookie-parser knex nodemon supertest dotenv jest ```

- **postgres** allows for connection with postgres DB 
- **nodemon** allows server to run as daemon
- **express** the API framework to answer HTTP requests
- **cookie-parser** parse cookies
- **knex** connect API to DB
- **superTest** allows testing with API
- **jest** unit test suit
- **dotenv** allows for usage of environment variables 

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

ref: https://blog.shahednasser.com/knex-js-tutorial-for-beginners
1. Init the repo
    
    ```npx knex init```

2. postgres connection string format: ``` postgres://USER:PASS@HOST:PORT/DB_NAME ```

#### Migrations
Migrations are used to create or destroy schemas within tables. This makes the database more portable.
We must create a table before we can start adding data to it.

1. Create a migration template using knex.

    ``` npx knex migrate:make MIGRATION_NAME ```

2. Create your schema. See the example in the migration dir.

3. Run your migration

    ``` npx knex migrate:latest ```
4. If you want to rollback

    ``` npx knex migrate:rollback ```

### Seeds
1. Create a seed using knex.

    ``` npx knex seed:make init_notes ```
2. Create the seed. See the example in the seeds dir.
3. Run the seed.

    ``` npx knex seed:run ```
4. Verify everything works by going to the postgres server and checking the tables


## Snippits / Paterns
### Params
- in routes use ' : ' to denote variables
- to consume the param ```req.params.<variable>```

### Knex Object Instanciasion
```js 
const localKnex = knex(development); 
```

### Express Object Instanciasion
```js 
const app = express();
app.use(express.json());
app.use(cookieParser());
```

### Supertest snipit
```js
describe('Some feature', ()=>{
    test('should do something', (done) => {
        request(app)
            .get('/route/to/somewhere/:id')
            .expect(200)
            .end((err, res) => {
                if(err) throw err;
                done();
        })
    });
});
```

### Up Migration
Inside of VS Code, after you type ```table.``` you can see all the methods available. These methods match the classic SQL query.
```js
export function up(knex) {
  return knex.schema.createTable('notes_table', (table) => {
    table.increments('id').notNullable;
    table.string('title').notNullable();
    table.string('data');
    table.timestamps(true, true);
  });
}
```

# REF
https://dev.to/asteinarson/typescript-node-js-importing-knex-into-es6-module-1poc

https://blog.shahednasser.com/knex-js-tutorial-for-beginners/#read-data-with-knexjs

https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

https://jestjs.io/docs/ecmascript-modules