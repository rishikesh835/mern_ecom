import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'

// configure new 
dotenv.config({path: '../.env'});

// database config 
connectDB();


//rest object
const app = express()

// middlewares 
app.use(express.json())
app.use(morgan('dev'))

// routes 
app.use('/api/v1/auth',authRoutes);



//rest api
app.get('/',(req,res) =>{
    res.send({
        message:`welcome to express app`,
    });
});

//port
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`.bgCyan.white);
})