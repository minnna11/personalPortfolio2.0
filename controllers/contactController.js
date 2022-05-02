const model = require('../models/contacting');
exports.index = (req, res,next)=>{
    //res.send('send all stories');
     return res.render('./contact/index')

 
};


// exports.new = (req, res)=>{
//     return res.render('./contact/index')
// };

exports.create = (req, res,next)=>{
    let contact = new model(req.body);//create a new contact document
    contact.save()//insert the document to the database
    .then(contact=> {
        req.flash('success', 'message has been created successfully');
        res.redirect('/contacts/');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
        req.flash('error', err.message);
        return res.redirect('back');
        }
        next(err);
    });
  
};




