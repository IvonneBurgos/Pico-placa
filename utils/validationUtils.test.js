 const ValidationUtils = require('./validationUtils');
describe("Validation Utils",()=>{
    it("should have 3 letters and 3 or 4 digits",()=>{
        const validation = ValidationUtils.checkFormat('GYE1234');
        expect(validation).toBe(true);
    });
    it("should return true when first letter belongs to a valid province code",()=>{
        const validation = ValidationUtils.checkProvince('G');
        expect(validation).toBe(true);
    });
    it("should return true when types belongs to a special type of plate",()=>{
        const validation = ValidationUtils.checkType('A');
        expect(validation).toBe(true);
    });

    it("should return false when last digit is 1 and time is between 7:00 and 9:30am",()=>{
        const dateInput = 'July 12, 2021 08:00:00';
        const lastDigit = 1
        const validation = ValidationUtils.checkDate(dateInput,lastDigit);
        expect(validation).toBe(false)
    });
});