const verifySignUp  = require("../middleware/hand.verifySignUp");
const authcontroller = require("../controllers/auth.handler.controller");
const app2 = require("express");
const router_handler=app2.Router();
const  authjwt  = require("../middleware/authjwt");


const appuse_xaccestoken= (req, res, next) => {
    res.header("Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  };
  router_handler.post("/auth/hsignup",verifySignUp,authcontroller.signup);
  router_handler.post("/auth/hsignin", authcontroller.signin);
  router_handler.get("/verify/handler",authjwt.beneficiaryverifyToken);
  router_handler.get('/auth/hsignout',authcontroller.signout); 
module.exports={
"appuse_xaccestoken":appuse_xaccestoken,
   "router_handler":router_handler
};



