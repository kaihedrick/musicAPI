import express, {Request, Response } from 'express'
import albumsRouter from './albums/albums.routes';
import artistsRouter from './artists/artists.routes';
import helmet from 'helmet';
import cors from 'cors';
import logger from './middleware/logger.middleware';
import dotenv from 'dotenv';

dotenv.config();

// Create an express app
const app = express();
const port = process.env.PORT;

// Enable all CORS requests
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Adding a set of security middleware
app.use(helmet());

console.log(process.env.MY_SQL_DB_HOST);
// Logger middleware
if (process.env.NODE_ENV == 'development') {
    app.use(logger);
    console.log(process.env.GREETING + ' in dev mode');
}

//application routes 
//root route
app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to the Music API</h1>');
});
// Define routes
app.use('/', [albumsRouter, artistsRouter]);

// Start the server and listen on port 5000
app.listen(port, () => {
    // Log a message to confirm the server is running
    console.log(`Example app listening at http://localhost:${port}`);
});
