import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectionToMongoDB from './db/dbConnection.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
// import cors from 'cors'

const app = express();
dotenv.config({path:"../.env"});
app.use(express.json());
// app.use(cors())
app.use(cookieParser())
// const PORT = process.env.PORT ;
console.log(process.env.PORT)


// app.get('/', (req, res)=>{
//     res.send('This is working as a new version')
// })

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
    connectionToMongoDB();
    console.log(`Server is running on port ${process.env.PORT}`);
})