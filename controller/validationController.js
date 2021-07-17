const ValidationManager = require("../services/validationManager");
const axios = require('axios');
exports.canDrive = (req,res,next)=>{
    const validation = ValidationManager.checkAllValidations(req.body);
    res.json({data:validation}) ;
}