const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  head: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  }
});

const Tag = mongoose.model("Tag", TagSchema);

module.exports = Tag;
