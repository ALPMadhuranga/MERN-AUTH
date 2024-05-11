import cors from 'cors';
import express  from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import path from 'path';

connectDB();
const port = process.env.PORT || 5000;

const app = express();

// middlewares 
app.use(express.json()); // Parses incoming requests with JSON payloads.
app.use(express.urlencoded({ extended: true })); // Parses incoming requests with URL-encoded payloads, including nested objects.
app.use(cookieParser()); // Parses cookies sent by the client to the server.
app.use(cors());

// End points
app.use('/api/users', userRoutes);

// Serve static files from the frontend build directory
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Serve frontend index.html for any route not handled by API
app.get("*", (req, res) => {
    res.send(path.join(__dirname, "frontend", "dist", "index.html"));
})

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})