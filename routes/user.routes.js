const express = require("express");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//resgisteration
userRouter.post("/register", async (req, res) => {
  const { email, pass, location, age } = req.body;
  try {
    bcrypt.hash(pass, 7, async (err, hash) => {
      const user = new UserModel({ email, pass: hash, location, age });
      await user.save();
      res.send({ msg: "Registeration has been done" });
    });
  } catch (err) {
    res.send({ msg: err.msg });
  }
});

//login
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  console.log(req.body)
  try {
    const user = await UserModel.findOne({email});
     console.log(user)
   if(user){
    bcrypt.compare(pass,user.pass, (err, result)=>{
        if(result){
            res.status(200).send({"msg":"login sucessfull","token":jwt.sign({"course":"backend"},"masai")})
        }else{
            res.status(400).send({"msg":"wrong creaentials"}) 
        }
     
    })
  } 
 } catch (err) {
    res.status(400).send({ msg: err.msg });
  }
});

// userRouter.get("/details", (req, res) => {
//   const { token } = req.query;
//   jwt.verify(token, "fjksd", (err, decoded) => {
//     decoded
//       ? res.status(200).send("user details")
//       : res
//           .status(400)
//           .send({ msg: "login requires ,canot access the restricted routes" });
//   });
// });

// userRouter.get("/moviedata", (req, res) => {
//   const token = req.headers.authorization;
//   jwt.verify(token, "fjksd", (err, decoded) => {
//     decoded
//       ? res.status(200).send("movie")
//       : res.status(400).send({ msg: err.msg });
//   });
// });

module.exports = {
  userRouter,
};
