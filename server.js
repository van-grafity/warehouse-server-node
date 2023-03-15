require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Routes
const userRouter = require('./app/routers/userRouter');
const materialRouter = require('./app/routers/materialRouter');

app.use('/profile_images', express.static('profile_images'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/users', userRouter);
app.use('/materials', materialRouter);

// test
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});