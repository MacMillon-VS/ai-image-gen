import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();
const app = express();
let PORT = process.env.PORT || 8000
app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async(req,res)=>{
    res.send('Hello From DALL_E Backend');
})

const startServer = async ()=>{
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(PORT, ()=>console.log(`Server started in port http://localhost:${PORT}`))
    } catch (error) {
        console.log(error);        
    }
}

startServer();