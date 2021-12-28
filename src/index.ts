import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import dotenv from 'dotenv'
import morgan from 'morgan'
import session from 'express-session'

import { todoRouter } from './routes/todo';
import { vaccineRouter } from './routes/vaccine';
import { userRouter } from './routes/user';
import { errorHandler } from './middlewares/error';


dotenv.config({ path: './env' });

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/qr-vaccination-rn';


const app = express();
const server = require("http").Server(app);

app.use(json());

// Session
app.use(
  session({
    secret: "holomyth",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 1000 },
  })
);


// Dev loggin middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Connect to database
mongoose.connect(MONGO_URI, {}, () => {
  console.log('connected to database' + MONGO_URI)
})

//Routes
app.use(todoRouter);
app.use(vaccineRouter);
app.use(userRouter);

//Error
app.use(errorHandler);


server.listen(
  PORT,
  () => {
    return console.log(`server is listening at port: ${PORT}`);
  }
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: any, promise) => {
  console.log(`Error: ${err}`);
  console.log(`Promise: ${promise}`);

  // Close server and Exit process
  server.close(() => process.exit(1));
});
