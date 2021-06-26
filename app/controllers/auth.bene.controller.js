const config = require("../config/auth.config");
const db = require("../models");
const beneficiary = db.beneficiary;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  console.log(req.body.buid, req.body.bname, req.body.bemail);
console.log("entered singup1 ");


  const newben = new beneficiary({
    uid: req.body.buid,
    name: req.body.bname,
    email: req.body.bemail,
    password: bcrypt.hashSync(req.body.bpassword, 8),
    age: req.body.bage,
  });
  console.log(newben);
  console.log("3entered singup");
  newben.save((err, bene) => {
    if (err) {
      console.log("if (err) {");
      res.status(500).send({ message: err });
      return;
    } else {
      console.log("4User was registered successfully");
      res.send({ message: "User was registered successfully!" });
    }
  });
};

exports.signin = (req, res) => {
console.log("inlogin1")
  beneficiary
    .findOne({
      email: req.body.email,
    })
    .exec((err, bene) => {
      if (err) {
        res.status(500).send({ message: "err" });
        return;
      } else if (!bene) {
        return res.status(404).send({ message: "beneficiary Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        bene.password,
        8
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: bene.buid }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      console.log("inlogin2")
      res.status(200).send({
        id: bene._id,
        name: bene.name,
        email: bene.email,
        accessToken: token,
      });
    });
};
exports.signout = (req, res, next) => {
  
	console.log("logout");
  res.status(200).send({
            "logout":"success"
    });
	// if (req.session) {
  //   // delete session object
  //   req.session.destroy(function (err) {
  //   	if (err) {
  //   		return next(err);
  //   	} else {
  //   		return res.status(200).send({
  //         "logout":"success"
  //       });
  //   	}
  //   });
// }
};