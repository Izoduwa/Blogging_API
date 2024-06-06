const moogoose = require("mongoose");

const Schema = moogoose.Schema;

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: [true, "Title must be unique"],
    },
    description: {
      type: String,
    },
    author: {
      type: String,
    },
    state: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    read_count: {
      type: Number,
      default: 0,
    },
    reading_time: {
      type: String,
    },
    tags: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = moogoose.model("BlogItems", BlogSchema);
