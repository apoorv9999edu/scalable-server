const db = require("../models");

const physician_collection = db.physician;


checkDuplicateUidOrEmail = function (req, res, next) {
  console.log(req.body.muid, req.body.pname, req.body.pemail);

  physician_collection
    .findOne({
      uid: req.body.puid,
      email: req.body.pemail,
    })
    .exec((err, physician_obj) => {
      if (err) {
        console.log("err");
      res.status(500).send({ message: err });
       
      } else if (physician_obj) {
        console.log("mphysicianphysicianphysician");
        res.status(400).send({ message: `Failed! already exist!` });
        
      }
      else{
        next();
      }
    });

};

const verifySignUp = checkDuplicateUidOrEmail;

module.exports = verifySignUp;
