    require('dotenv').config();
    const mongoose = require('mongoose');
    const cors = require('cors');
    const cookieparser = require('cookie-parser');
    const express = require('express');
    const authRouter = require('./routers/authRouter')

    

    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(cookieparser());

    //routes

    app.use('/api', authRouter)



    const port = process.env.PORT || 5000;
    // const URL = process.env.MONGO_URI;

    // mongoose.connect(uri,{
    //     useCreateIndex: true,
    //     useFindAndModify: false,
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // }, err=>{
    //     if(err) throw err;
    //     console.log('db is connected')
    // })

   

    app.listen(port , ()=>{
        console.log(`app is running on ${port}`)
    })