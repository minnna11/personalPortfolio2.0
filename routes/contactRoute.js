const express = require('express');
const controller = require('../controllers/contactController');
const router = express.Router();

const{validateMessage,validateResult} = require('../middlewares/validator');


//GET /stories send all stories to user
router.get('/', controller.index);

// //GET /stories/new: send html form for creating new stories
// router.get("/new", controller.new);

//POST /stories send a create a new story
router.post('/', validateMessage,validateResult,controller.create);


module.exports = router;