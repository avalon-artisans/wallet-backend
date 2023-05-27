import express from 'express';
const app = express();

// Import the routes
const userRoute = require('./routes/UserRoute');

// Middleware
app.use(express.json());

// Use the routes
app.use('/api', userRoute);

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
