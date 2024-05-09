import express  from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

connectDB();
const port = process.env.PORT || 5000;

// middlewares 
const app = express();

// End points
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Server is ready!'));

// Error middleware
app.use(notFound);
app.use(errorHandler);

// listen to port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})