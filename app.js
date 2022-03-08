/*
 * This file manages the routing for the API
 */
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();

// SIMPLE GET ROUTE
// NOTE: When building a server from scratch, start here to ensure your connections are good.
app.get('/', (req, res) => {
    // Must be included.
    // the .send is a method of Express to return information
    res.send('Welcome to Nacho API');
});

// PARRAMS and COOKIES
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
app.use(cookieParser());
app.get('/hello', (req, res)=>{
    // Simplify the cookie object to single var for DRY programing.
    const cookieObj = req.cookies.loginCookie;
    
    res.status(200);
    console.log(`Greet: ${cookieObj.userId}`)
    // NOTE: The key in the object MUST match from when the cookie was created .
    res.send(`Hello, ${cookieObj.userId}`)
    
});




export default app;