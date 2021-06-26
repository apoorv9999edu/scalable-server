const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig=require("./app/config/db.config.js");
const router =express.Router;
const app = express();
const beneficiaryroutes=require("./app/routes/routes.beneficiary");
const router_handler=require("./app/routes/routes.handler");
const router_manufacturer=require("./app/routes/routes.manufacturer");
const router_physician=require("./app/routes/routes.physician");


var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

console.log("/b");
app.use(beneficiaryroutes.appuse_xaccestoken);
app.use("/b",beneficiaryroutes.routerbeneficiary);

console.log("/h");
app.use(router_handler.appuse_xaccestoken);
app.use("/h",router_handler.router_handler);

console.log("/m");
app.use(router_manufacturer.appuse_xaccestoken);
app.use("/m",router_manufacturer.router_manufacturer);

console.log("/p");
app.use(router_physician.appuse_xaccestoken);
app.use("/p",router_physician.router_physician);













// simple route
app.get("/", (req, res) => {
  res.json({ message: "jklasdgsdg" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});