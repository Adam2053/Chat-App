import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectionToMongoDB from './db/dbConnection.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import { app, server } from './socket/socket.js';
import path from 'path';
// import cors from 'cors'

const __dirname = path.resolve();

dotenv.config();
app.use(express.json());
// app.use(cors())
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

server.listen(process.env.PORT, () => {
    connectionToMongoDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});