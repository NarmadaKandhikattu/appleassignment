const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse http request body for application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
})); // parse application/x-www-form-urlencoded

// load routes.js 
require('./routes.js')(app);

// start express server 
app.listen(8765, ()=>{
    console.log("Node Server is up and running on port 8765..");
});

// Handle the exceptions which are not handeled at code level
process.on('uncaughtException', (err)=>{
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)
});