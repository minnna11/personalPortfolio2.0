//require models
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const generalRoutes = require('./routes/generalRoutes');
const contactRoute = require('./routes/contactRoute');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const session = require('express-session');

//create app
const app = express();
//configure app
let port = process.env.PORT || 3000;
let host = 'localhost'; 
app.set('view engine', 'ejs');

//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/PersonalPortfolio', 
                {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    //start the server
    app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
})
})
.catch(err=>console.log(err))
//mount middleware
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/NBAD'}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

//middleware
//serve static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
//log http request
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//set up routes
app.use('/',generalRoutes);
app.use('/contacts',contactRoute);
//error handling
app.use((req,res,next)=>{
    let err = new Error('The server cannot locate '+req.url);
    err.status = 404;
    next(err);
})

app.use((err, req, res,next)=>{
    if(!err.status){
        err.status = 500;
        err.message =("Internal Server Error");
    }
    res.status(err.status);
    res.render('error',{error:err});
})

//start the servers
// app.listen(port,host,()=>{
//     console.log('Server is running on port '+port);
// })