const mongoose = require("mongoose")

const templateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: String,
  styles: {
    titleFont: String,
    contentFont: String,
    titleSize: String,
    contentSize: String,
    titleColor: String,
    contentColor: String,
    alignment: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Template", templateSchema)

