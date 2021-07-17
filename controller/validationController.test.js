const ValidationController = require('./validationController');
const httpMocks = require("node-mocks-http");

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});
describe("Validation Controller", ()=>{
    it("should return false when license plate last digit is 1 on Mondays at 8:00am", ()=>{
        req.body = { 
            "plate": "PYE0001",
            "datetime": "July 12, 2021 08:00:00"
        };
        ValidationController.canDrive(req,res,next);
        expect(res._getJSONData()).toEqual({data:"Can not drive"});
    });

    it("should return false when license plate last digit is 2 on Mondays at 19:00pm", ()=>{
        req.body = { 
            "plate": "PYE0001",
            "datetime": "July 12, 2021 19:00:00"
        };
        ValidationController.canDrive(req,res,next);
        expect(res._getJSONData()).toEqual({data:"Can not drive"});
    });
    it("should return true when license plate last digit is 1 on any day but Monday",()=>{
        req.body = { 
            "plate": "PYE0001",
            "datetime": "July 13, 2021 19:00:00"
        };
        ValidationController.canDrive(req,res,next);
        expect(res._getJSONData()).toEqual({data:"Can drive"});
    });
    it("should return true to any licence plate on weekends", ()=> {
        req.body = { 
            "plate": "PYE0001",
            "datetime": "July 17, 2021 19:00:00"
        };
        ValidationController.canDrive(req,res,next);
        expect(res._getJSONData()).toEqual({data:"Can drive"});
    });
    it("should return true to special types licenses", ()=> {
        req.body = { 
            "plate": "PAE0001",
            "datetime": "July 12, 2021 18:00:00"
        };
        ValidationController.canDrive(req,res,next);
        expect(res._getJSONData()).toEqual({data:"Special plate, can drive"});
    });

    it("should identify non valid plates", ()=> {
        req.body = { 
            "plate": "DAE0001",
            "datetime": "July 12, 2021 18:00:00"
        };
        ValidationController.canDrive(req,res,next);
        expect(res._getJSONData()).toEqual({data:"Invalid plate"});
    });
})