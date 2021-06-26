const db = require("../models");

const handler_collection = db.handler;

checkDuplicateUidOrEmail = function (req, res, next) {
  console.log(req.body.huid, req.body.hname, req.body.hemail);

  handler_collection
    .findOne({
      uid: req.body.huid,
      email: req.body.hemail,
    })
    .exec((err, handler_object) => {
      if (err) {
        console.log("err");
      res.status(500).send({ message: err });
       
      } else if (handler_object) {
        console.log("bhandlerverifysignup");
        res.status(400).send({ message: `Failed! already exist!` });
        
      }
      else{
        next();
      }
    });

};

const verifySignUp = checkDuplicateUidOrEmail;

module.exports = verifySignUp;
