import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'

// configure new 
dotenv.config();

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
const HOSTNAME = process.env.HOSTNAME;

app.listen(PORT,HOSTNAME,()=>{
    console.log(`server started on port http://${HOSTNAME}:${PORT}`.bgCyan.white);
})