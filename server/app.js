const express = require('express');
const app = express();
const port = 5000;

const initApp = require('./init')
const initRoutes = require('./routes')

initApp(app);
initRoutes(app);

const {connectDb} = require('./models');
connectDb();

app.listen(port, () => {
    console.log('Server is running on port ', port);
})