const express = require('express');
const app = express();


//Setting up port from env. variable or 8002
const PORT = process.env.PORT || 8002;

//Initiating server
app.listen(PORT, ()=> {
    console.log(`Server running at ${PORT}`);
})