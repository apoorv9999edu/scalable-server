const db = require("../models");

const beneficiary = db.beneficiary;

checkDuplicateUidOrEmail = function (req, res, next) {
  console.log(req.body.buid, req.body.bname, req.body.bemail);

  beneficiary
    .findOne({
      uid: req.body.buid,
      email: req.body.bemail,
    })
    .exec((err, ben) => {
      if (err) {
        console.log("err");
      res.status(500).send({ message: err });
       
      } else if (ben) {
        console.log("ben");
        res.status(400).send({ message: `Failed! already exist!` });
        
      }
      else{
        next();
      }
    });

};

const verifySignUp = checkDuplicateUidOrEmail;

module.exports = verifySignUp;
