require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./src/routes/routes');
const errorHandler = require('./src/middleware/errorHandler.middleware');
const connectDB = require('./src/config/database');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(routes);
connectDB();

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
})