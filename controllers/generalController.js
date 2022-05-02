const model = require('../models/contacting');
exports.index = (req, res,next)=>{
    return res.render('index');
}

exports.about = (req, res,next)=>{
    return res.render('./general/about');
}

