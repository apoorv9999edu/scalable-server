const verifySignUp  = require("../middleware/phy.verifySignUp");
const authcontroller = require("../controllers/auth.physician.controller");
const app2 = require("express");
const router_physician=app2.Router();
const  authjwt  = require("../middleware/authjwt");


const appuse_xaccestoken= (req, res, next) => {
    res.header("Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  };
  router_physician.post("/auth/psignup",verifySignUp,authcontroller.signup);
  router_physician.post("/auth/psignin", authcontroller.signin);
  router_physician.get("/verify/physician",authjwt.beneficiaryverifyToken);
  router_physician.get('/auth/psignout',authcontroller.signout); 
module.exports={
"appuse_xaccestoken":appuse_xaccestoken,
   "router_physician":router_physician
};



