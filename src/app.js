import express from "express"


const app = express();
app.get('/', (req, res) =>    { 
    res.send('Hello World!  Welcome to base camp')
});

export default app; 