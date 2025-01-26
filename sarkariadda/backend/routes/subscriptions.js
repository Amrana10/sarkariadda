const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const Subscription = require("../models/Subscription")

// @route   POST api/subscriptions
// @desc    Subscribe to email alerts
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("categories", "Categories are required").isArray({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, categories } = req.body

    try {
      let subscription = await Subscription.findOne({ email })

      if (subscription) {
        subscription.categories = categories
        await subscription.save()
      } else {
        subscription = new Subscription({
          email,
          categories,
        })
        await subscription.save()
      }

      res.json(subscription)
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server error")
    }
  },
)

// @route   DELETE api/subscriptions
// @desc    Unsubscribe from email alerts
// @access  Public
router.delete("/", [check("email", "Please include a valid email").isEmail()], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email } = req.body

  try {
    await Subscription.findOneAndDelete({ email })
    res.json({ msg: "Unsubscribed successfully" })
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server error")
  }
})

module.exports = router

