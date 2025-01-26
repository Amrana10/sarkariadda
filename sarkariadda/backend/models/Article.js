const mongoose = require("mongoose")

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Tenders", "Policy Updates", "Press Releases", "Public Notices"],
  },
  tags: [String],
  publishDate: {
    type: Date,
    default: Date.now,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
})

// Create a text index for full-text search
ArticleSchema.index({ title: "text", content: "text", tags: "text" })

module.exports = mongoose.model("Article", ArticleSchema)

