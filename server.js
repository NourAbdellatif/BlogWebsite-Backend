const express = require("express");
const User = require("./models/user");
const Blog = require("./models/blog");
const route_user = require("./router/route_user");
const route_blog = require("./router/route_blog");
const cors = require("cors");
const bodyParser = require("body-parser");

// var test_user={
//     userID:"512",
//     username:"Penguinity",
//     password:"penguins<3"
// }

// var test_blog={
//     userID:"512",
//     title:"How to not tilt playing with ipIaylol",
//     body:"This is the body of my dead body xD",
//     author:"Lighto",
//     tags:["Horror","tilt-proof","c"]
// }

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use("/users", route_user);
app.use("/blogs", route_blog);
app.listen(1111);
