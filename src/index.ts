import express from 'express';
import userRoute from './routes/UserRoute';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({
    extended : true
}));

// Middleware
app.use(express.json());

// Use the routes
app.use('/api', userRoute);

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
