const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  noIndex: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Page = mongoose.model("Page", PageSchema);

module.exports = Page;
