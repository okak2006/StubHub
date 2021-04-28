import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';

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
app.use(express.json());

// Skaffold Routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all('*', () => {
    throw new NotFoundError
})
app.use(errorHandler);

// DB Connect
const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
         })
         console.log('connected to mongodb')
    } catch (err) {
        console.error(err);
    }
    app.listen(3000, ()=> {
        console.log('Listening on 3000!')
    })
};

start();
