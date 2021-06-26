const config = require("../config/auth.config");
const db = require("../models");
const manufacturer_collection = db.manufacturer;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => 
{
  console.log(req.body.muid, req.body.mname, req.body.memail);
  console.log("entered singup1 ");

  const new_manufacturer_instance = new manufacturer_collection({
    uid: req.body.muid,
    name: req.body.mname,
    email: req.body.memail,
    password: bcrypt.hashSync(req.body.mpassword,8),
    med: req.body.mmed,
  });
  console.log(new_manufacturer_instance);
  console.log("3entered v manufacture singup");
  new_manufacturer_instance.save((err, manufacturer_obj) => {
    if (err) {
      console.log("if (err) {");
      res.status(500).send({ message: err });
      return;
    } else {
      console.log("4 manufacture User was registered successfully");
      res.send({ message: "User was registered successfully!" });
    }
  });
};

exports.signin = (req, res) => {
console.log("inlogin1 manufacturer")
  manufacturer_collection
    .findOne({
      email: req.body.email,
    })
    .exec((err, manufacturer_obj2) => {
      if (err) {
        res.status(500).send({ message: "err" });
        return;
      } else if (!manufacturer_obj2) {
        return res.status(404).send({ message: "manufacutrer Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        manufacturer_obj2.password,
        8
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: manufacturer_obj2.muid }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      console.log("inlogin2")
      res.status(200).send({
        id: manufacturer_obj2._id,
        name: manufacturer_obj2.name,
        email: manufacturer_obj2.email,
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