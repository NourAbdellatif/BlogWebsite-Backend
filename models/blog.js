var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose
  .connect("mongodb://localhost:27017/blog_website", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("connected to Blog Database through Blog");
  });

const blog_schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
    },
    body: {
      type: String,
    },
    tags: {
      type: Array,
    },
  },
  { versionKey: false }
);

const Blog = mongoose.model("Blog", blog_schema);
module.exports = Blog;
