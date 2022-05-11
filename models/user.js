var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose
  .connect("mongodb://localhost:27017/blog_website", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("connected to Blog Database through user");
  });

const user_schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
const User = mongoose.model("User", user_schema);
module.exports = User;
