
const utils = require("../utils/validationUtils");
const status = Object.freeze({
    INVALID_PLATE: "Invalid plate",
    CANNOT_DRIVE:"Can not drive",
    CAN_DRIVE:"Can drive",
    CAN_DRIVE_SPECIAL:"Special plate, can drive"
})
exports.checkAllValidations = (data)=>{
    const type = data.plate.charAt(1);
    const lastDigit = parseInt(data.plate.charAt(data.plate.length-1));
    
    if(!utils.checkFormat(data.plate) || !utils.checkProvince(data.plate.charAt(0))){
        return status.INVALID_PLATE;
    }
    if(utils.checkType(type)){
        return status.CAN_DRIVE_SPECIAL;
    }
    if(utils.checkDate(data.datetime,lastDigit)){
        return status.CAN_DRIVE;
    }else{
        return status.CANNOT_DRIVE;
    }
}