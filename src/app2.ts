// Import the express library and types for request and response
import express, { Request, Response } from 'express';

// Create an express app
const app = express();

// Set the port number to 3000
const port = 3000;

// Handle GET requests to the root URL
app.get('/', (req: Request, res: Response) => {
  // Send a message as the response
  res.send('Hello World from TypeScript!');
});

// Start the server and listen on port 3000
app.listen(port, () => {
  // Log a message to confirm the server is running
  console.log(`Example app listening at http://localhost:${port}`);
});
