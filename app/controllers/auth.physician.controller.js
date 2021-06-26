const config = require("../config/auth.config");
const db = require("../models");
const physician_collection = db.physician;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => 
{
  console.log(req.body.puid, req.body.pname, req.body.pemail);
  console.log("entered singup1 ");

  const new_physician_instance = new physician_collection({
    uid: req.body.puid,
    name: req.body.pname,
    email: req.body.pemail,
    password: bcrypt.hashSync(req.body.ppassword,8),
    role: req.body.prole,
  });
  console.log(new_physician_instance);
  console.log("3entered physicina singup");

  new_physician_instance.save((err, physician_obj) => {
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
  physician_collection
    .findOne({
      email: req.body.email,
    })
    .exec((err, physician_obj2) => {
      if (err) {
        res.status(500).send({ message: "err" });
        return;
      } else if (!physician_obj2) {
        return res.status(404).send({ message: "physician Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        physician_obj2.password,
        8
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: physician_obj2.puid }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      console.log("inlogin2")
      res.status(200).send({
        id: physician_obj2._id,
        name: physician_obj2.name,
        email: physician_obj2.email,
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