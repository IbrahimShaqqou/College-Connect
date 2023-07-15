    const express = require('express');

    const app = express();
    const port = 5000;

    app.get("", (req,res)=>{
        res.status(500).send("hello WRLD");
    })

    app.listen(port , ()=>{
        console.log(`app is running on ${port}`)
    })