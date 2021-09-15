import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
const mongoose = require('mongoose');

// Import Routes
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { NotFoundError } from './errors/not-found-error';

// Middlewares
import { errorHandler } from './middlewares/error-handler';

// Express Boilerplate
const app = express();
// Traffic is being proxied to our application through ingress-nginx. By default express does not trust proxied requests
app.set('trust proxy', true);
app.use(express.json());
// Use cookie-session to store and read JWT is cookie. JWT's are tamper resistant so no need for encryption here. Cookie-Session stores cookies in req.session
app.use(cookieSession({
    signed: false,
    secure: true,
}))

// Skaffold Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
// Catch all branch for requests made to undefined branch
app.all('*', () => {
    throw new NotFoundError
})
// Add express's built-in error handler for taking care of errors encountered in the app. Must be added at end of mw function stack.
app.use(errorHandler);

// DB Connect
const start = async () => {
    try {
        // mongoose will automatically create db following the url (mongodb:://url/db) if it doesn't exist. note:  required in v5 mongoose.
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
         console.log('connected to mongodb')
    } catch (err) {
        console.error(err);
    }
    app.listen(3000, ()=> {
        console.log('Listening on 3000!')
    })
};

start();
