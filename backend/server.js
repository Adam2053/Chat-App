import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'
import connectionToMongoDB from './db/dbConnection.js';

const app = express();
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 5000;


// app.get('/', (req, res)=>{
//     res.send('This is working as a new version')
// })

app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
    connectionToMongoDB();
    console.log(`Server is running on port ${PORT}`);
})