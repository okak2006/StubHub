const mongoose = require('mongoose');

import { app } from './app';

// DB Connect
const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error('JWT Key must be defined');
    }
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
