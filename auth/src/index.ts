import express from 'express';
import 'express-async-errors';

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

app.listen(3000, ()=> {
    console.log('Listening on 3000!')
})
