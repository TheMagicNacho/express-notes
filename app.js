/*
 * This file manages the routing for the API
 * Basic functionality 
 * 1) Simple get routing
 * 2) Using params and cookies
 * 3) Integrating SQL with knex
 */
import express from 'express';
import cookieParser from 'cookie-parser';
import knex from 'knex';

// this reffrences the kenex file we created.
// TODO: make this based on environment variables in the future.
import { development } from './knexfile.js';

///////// ENVIRONMENT PREP //////////
// this creates the express object as an app. We can call it something else if we use it later.
// NOTE: enusre attache the body parser and cookieParser to the object.
const app = express();
app.use(express.json());
app.use(cookieParser());

// instanciate a new knex object with the connection requirements attached.
const localKnex = knex(development);


///////// ACTUAL ROUTING //////////
// 1) SIMPLE GET ROUTE
// NOTE: When building a server from scratch, start here to ensure your connections are good.
app.get('/', (req, res) => {
    // Must be included.
    // the .send is a method of Express to return information
    res.send('Welcome to Nacho API');
});

// 2) PARAMS AND COOKIES
app.get('/login/:id', (req, res) => {
    const opts = {
        httpOnly: true,
        secure: false
    };
    // This line extracts the passed paremeter from the URL route.
    // the pattern is req.params the following .method is whatever the var from the route is.
    // Variables in routes are denoted with a colon ' : '
    const userId = req.params.id;

    // Back end will log usage of user loging in.
    console.log(`User ${userId} attempting login.`);

    // Pass a cookie to the user
      // Syntax of res.cookie();
      // res.cookie(<nameOfCookie>:string, <cookieObj>: Object, <options>: Object) 
    res.cookie('loginCookie', {"userId": userId}, opts);

    // Close connection
    res.end();
});

// Consume the cookie
app.get('/hello', (req, res)=>{
    // Simplify the cookie object to single var for DRY programing.
    const cookieObj = req.cookies.loginCookie;
    
    res.status(200);
    console.log(`Greet: ${cookieObj.userId}`)
    // NOTE: The key in the object MUST match from when the cookie was created .
    res.send(`Hello, ${cookieObj.userId}`)
});

// 3) INTEGRATING SQL
app.get('/notes', (req, res) => {
    // use the newly created knex object since it has the connection data included.
    localKnex
        // Structured like a typical SQL query.
        .select('*')
        .from('notes_table')
        // How to handle the incoming payload.
        .then(data => res.status(200).json(data))
        .catch(err =>
          res.status(404).json({
            message:
              'The data you are looking for could not be found. Please try again'
          })
        );
});

// Posting data to the SQL db
app.post('/notes', (req, res) => {
    console.log(JSON.stringify(req.body.title));
    // condition the user input
    const title = req.body.title ? req.body.title : '';
    const data = req.body.data ? req.body.data : '';
    // error handle that a title exists in some way. Even if it is null
    if (!title) {
        return res.json({success: false, message: 'Title is required'});
    }

    // Call the knex object we created earlier.
    localKnex
        .insert({title, data})
        .from('notes_table')
        .then(data => res.status(200).json(data))
        .catch((err) => {
        console.error(err);
            return res.status(400).json({success: false, message: 'An error occurred, please try again later.'});
    });

});


export default app;
