import express  from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

connectDB();
const port = process.env.PORT || 5000;

const app = express();

// middlewares 
app.use(express.json()); // Parses incoming requests with JSON payloads.
app.use(express.urlencoded({ extended: true })); // Parses incoming requests with URL-encoded payloads, including nested objects.
app.use(cookieParser()); // Parses cookies sent by the client to the server.

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