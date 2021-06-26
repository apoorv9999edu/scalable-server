const config = require("../config/auth.config");
const db = require("../models");
const handler_collection = db.handler;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => 
{
  console.log(req.body.huid, req.body.hname, req.body.hemail);
  console.log("entered singup1 ");

  const new_handler_instance = new handler_collection({
    uid: req.body.huid,
    name: req.body.hname,
    email: req.body.hemail,
    password: bcrypt.hashSync(req.body.hpassword,8),
    role: req.body.hrole,
  });
  console.log(new_handler_instance);
  console.log("3entered singup");
  new_handler_instance.save((err, handler_obj) => {
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
  handler_collection
    .findOne({
      email: req.body.email,
    })
    .exec((err, handler_obj2) => {
      if (err) {
        res.status(500).send({ message: "err" });
        return;
      } else if (!handler_obj2) {
        return res.status(404).send({ message: "handler Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        handler_obj2.password,
        8
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: handler_obj2.huid }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      console.log("inlogin2")
      res.status(200).send({
        id: handler_obj2._id,
        name: handler_obj2.name,
        email: handler_obj2.email,
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