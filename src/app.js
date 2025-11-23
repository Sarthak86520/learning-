import e from "express";
import express from "express"

import cors from "cors";   

const app = express();

// bassic configurations
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true, limit: '16kb'}));
app.use(express.static('public'));

//cors configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],  
}));

// import the routes
import healthcheckRoutes from './routes/healthcheck.routes.js';

app.use("/api/v1", healthcheckRoutes);

app.get('/', (req, res) =>    { 
    res.send('Hello World!  Welcome to base camp')
});

export default app; 