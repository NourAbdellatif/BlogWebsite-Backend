const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(401).send("Username already taken");
  }

  var user = new User({
    username,
    password,
  });
  await user.save();
  res.status(200).send("User registered successfully");
  // const token = jwt.sign(obj.toJSON(),"user")
  // obj.token=token;
  // obj.save((err,obj)=>{
  // console.log(obj);
  // if(err) return console.log(err);
  // console.log("Added new User")
  // res.send(obj);
  // User.count({"username":obj.username},(err,count)=>{
  //     if(count>0){
  //         res.status(400)
  //         res.send("Username already taken")
  //     }
  //     else{
  //         const token = jwt.sign(obj.toJSON(),"user")
  //         obj.token=token;
  //         obj.save((err,obj)=>{
  //             console.log(obj);
  //             if(err) return console.log(err);
  //             console.log("Added new User")
  //             res.send(obj);
  //         })
  //     }
  // })
});

router.get("/myBlogs", async (req, res) => {
  let token = req.headers.authorization;
  token = token.split(" ")[1];
  try {
    const { id } = jwt.verify(token, "secret");
    const blogs = await Blog.find({ user: id }).populate("user", "-password");
    res.send(blogs);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username, password }).select(
    "-password"
  );
  if (!existingUser) {
    return res.status(401).send("Incorrect credentials");
  }
  const token = jwt.sign({ id: existingUser._id }, "secret", {
    expiresIn: "365d",
  });

  res.send({
    user: existingUser,
    token,
  });
  // console.log(req.body)
  // var obj =new User({
  //     username:req.body.username,
  //     password:req.body.password
  // })
  // console.log(obj.username)
  // User.count({"username":obj.username,"password":obj.password},(err,count)=>{
  //     if(count>0){
  //         console.log("User Login")
  //         User.findOne({"username":obj.username},(err,temp)=>{
  //             res.send(temp);
  //         })
  //     }
  //     else{
  //         res.status(400);
  //         res.send("incorrect credentials")
  //     }
  // })
});

router.get("/:userID/blogs", (req, res) => {
  Blog.find({ userID: req.params.userID }, (err, query) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Got userID Blogs");
      res.send(query);
    }
  });
});

module.exports = router;
