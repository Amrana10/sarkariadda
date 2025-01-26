const mongoose = require("mongoose")

const SubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  categories: [
    {
      type: String,
      enum: ["Tenders", "Policy Updates", "Press Releases", "Public Notices"],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Subscription", SubscriptionSchema)

