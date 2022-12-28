const express = require("express");
const bodyparser = require("body-parser");

const path = require("path");
const exphbs = require("express-handlebars");

const app = express();
app.engine(
  "handlebars",
  exphbs.engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/ " })
);
app.set("view engine", "handlebars");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index");
});

var email;
//otp generate
var otp;
// otp = Math.random();
// otp = otp * 1000000;
// otp = parseInt(otp);
// console.log(otp);

app.post('/send', function (req, res) {
    otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    console.log(otp);
  email = req.body.email;
  res.render("otp");
});

app.post('/verify', function (req, res) {
    //console.log(req.body.otp);
  if (req.body.otp == otp) {
    
    // res
    //   .status(200)
    //   .send(
    //     `<h3>You has been successfully registered Your Email is </h3><h2> ${email}</h2>`
    //   );
    res.status(200).render("myprofile",{ msgg: `${email}` })
  } else {
    res.status(300).render("otp", { msg: "You have entered incorrect OTP" });
  }
});

app.post("/resend", function (req, res) {
  otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);
  console.log(otp);

  res.status(200).render("otp", { msg: "OTP has been sent on your Email ID" });
});

//defining port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`app is live at ${PORT}`);
});