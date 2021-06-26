const db = require("../models");

const manufacturer_collection = db.manufacturer;

checkDuplicateUidOrEmail = function (req, res, next) {
  console.log(req.body.muid, req.body.mname, req.body.memail);

  manufacturer_collection
    .findOne({
      uid: req.body.muid,
      email: req.body.memail,
    })
    .exec((err, manufacturer_obj) => {
      if (err) {
        console.log("err");
      res.status(500).send({ message: err });
       
      } else if (manufacturer_obj) {
        console.log("manufacturer");
        res.status(400).send({ message: `Failed! already exist!` });
        
      }
      else{
        next();
      }
    });

};

const verifySignUp = checkDuplicateUidOrEmail;

module.exports = verifySignUp;
