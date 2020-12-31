const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.get('/', (req, res)=>{
    res.status(200).json({
        msg: 'Hello World'
    })
})


app.listen(8080, ()=>{
    console.log('Server Listening on port 8080');
})

