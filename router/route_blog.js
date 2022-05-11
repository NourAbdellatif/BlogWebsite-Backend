const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const { query } = require("express");
const jwt = require("jsonwebtoken");

router.post("/post", async (req, res) => {
  let token = req.headers.authorization; //Bearer djaldfjaldjflakdjfladjkfladjkfla
  token = token.split(" ")[1];
  try {
    const { id } = jwt.verify(token, "secret");
    var blog = new Blog({
      user: id,
      ...req.body,
    });
    await blog.save();
    res.send(blog);
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndUpdate(id, req.body);
    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  const blogs = await Blog.find().populate("user", "-password");
  res.send(blogs);
  //   console.log("Get all Blogs");
  //   Blog.find({}, (err, query) => {
  //     res.send(query);
  //   });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.send(blog);
  //   console.log("Get blog by ID");
  //   Blog.findOne({ blogID: req.params.blogID }, (err, query) => {
  //     console.log(err);
  //     res.send(query);
  //   });
});

router.delete("/:id", async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  res.status(200).send(blog);
  //   var deleteID = req.params.blogID;
  //   console.log("Deleted Blog");
  //   Blog.deleteOne({ blogID: deleteID }, (err, query) => {
  //     res.send(query);
  //   });
});

module.exports = router;
