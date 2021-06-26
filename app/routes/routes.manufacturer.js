const verifySignUp  = require("../middleware/manu.verifySignUp");
const authcontroller = require("../controllers/auth.manu.controller");
const app2 = require("express");
const router_manufacturer=app2.Router();
const  authjwt  = require("../middleware/authjwt");


const appuse_xaccestoken= (req, res, next) => {
    res.header("Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  };
  router_manufacturer.post("/auth/msignup",verifySignUp,authcontroller.signup);
  router_manufacturer.post("/auth/msignin", authcontroller.signin);
  router_manufacturer.get("/verify/manufacturer",authjwt.beneficiaryverifyToken);
  router_manufacturer.get('/auth/msignout',authcontroller.signout); 
module.exports={
"appuse_xaccestoken":appuse_xaccestoken,
   "router_manufacturer":router_manufacturer
};



