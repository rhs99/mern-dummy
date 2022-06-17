const express = require('express')
const mongoose = require('mongoose')
const accountRouter = require('./src/base-router')
const cors = require('cors')


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(accountRouter);

mongoose.connect('mongodb://mongo:27017/my-db',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const PORT = 3050;
app.listen(PORT, ()=>{
    console.log(`listenint on port ${PORT}`)
});