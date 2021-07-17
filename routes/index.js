var express = require('express');
var router = express.Router();
const validationController = require('../controller/validationController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json( { title: 'Pico y placa app' });
});
router.get('/verify', validationController.canDrive);

module.exports = router;
