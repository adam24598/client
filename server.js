const express =require('express');
const mongoose = require('mongoose');
const config = require ('config');

const auth = require ('./routes/api/auth')
const users = require ('./routes/api/users');


const app =express();
app.use(express.json());

const db= config.get('mongoURI');
mongoose
.connect(db,{ useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true,useFindAndModify:false })
.then(()=>console.log('mongoDB connected'))
.catch(err=> console.log(err));


app.use('/api/users',users)
app.use('/api/auth',auth)


const port =process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server started on ${port}`));
