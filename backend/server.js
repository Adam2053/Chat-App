import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'

const app = express();
app.use(express.json());


dotenv.config();
const PORT = process.env.PORT || 5000;



app.get('/', (req, res)=>{
    res.send('This is working as a new version')
})

app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})