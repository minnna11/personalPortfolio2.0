//require models
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const generalRoutes = require('./routes/generalRoutes');
//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost'; 
app.set('view engine', 'ejs');

//middleware
//serve static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
//log http request
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//set up routes
app.use('/',generalRoutes);

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
app.listen(port,host,()=>{
    console.log('Server is running on port '+port);
})