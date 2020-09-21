const express = require('express');
const app = express();
const routes = require('./src/routes/EmailRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({path: __dirname + '/.env'});

//Setting up middleware
app.use(express.json({extended:false}))
app.use(cors());

//Calling routes
app.use('/api', routes)

//Setting up port from env. variable or 8002
const PORT = process.env.PORT || 8006;

app.listen(PORT, ()=> {
    console.log(`Server running at ${PORT}`);
})

