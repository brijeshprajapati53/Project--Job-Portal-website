//API documentation
import swaggerDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


//import [packages]
// const express = require('express');
import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors'
import morgan from 'morgan'

//import [files]
import connectDB from './config/db.js ';

//security packages
import helmet from 'helmet';
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize';

//import routes
import authRoutes from './routes/authRoutes.js';
import errorMiddlewares from './middlewares/errorMiddlewares.js';
import userRoutes from './routes/userRoutes.js'
import jobsRoutes from './routes/jobsRoute.js'
import testRoutes from './routes/testRoutes.js'


//.env config
dotenv.config();

//mongodb conn
connectDB();

//swagger-api config
//swagger api options
const options = {
    definition:{
    openapi:"3.0.0",
    info:{
        title:"Job Portal Application",
        description:"Node Express-js Job Portal Application",
    },
    servers:[
        {
            url:"https://job-portal-website-idhn.onrender.com",
        }
    ],
},
apis:["./routes/*.js"],

};


const spec = swaggerDoc(options)

//rest object
const app =  express();


//middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// //Home route
// app.get("/",(req,res)=>{
//     res.send("welcome to job");
// })

//routes
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/test",testRoutes);
app.use("/api/v1/job",jobsRoutes);

//home-route
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));


//validation middleware
app.use(errorMiddlewares);

//port
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`server runnning on port : ${PORT} in ${process.env.DEV_MODE} mode`.bgYellow.white);
});
