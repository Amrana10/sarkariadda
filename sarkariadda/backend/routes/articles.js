const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const auth = require("../middleware/auth")
const Article = require("../models/Article")
const User = require("../models/User")

// @route   POST api/articles
// @desc    Create a new article
// @access  Private (Admin and Editor only)
router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("content", "Content is required").not().isEmpty(),
      check("category", "Category is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select("-password")

      if (user.role !== "admin" && user.role !== "editor") {
        return res.status(403).json({ msg: "Not authorized to create articles" })
      }

      const newArticle = new Article({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        author: req.user.id,
        tags: req.body.tags,
      })

      const article = await newArticle.save()

      res.json(article)
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  },
)

// @route   GET api/articles
// @desc    Get all articles
// @access  Public
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find({ status: "published" })
      .sort({ publishDate: -1 })
      .populate("author", ["username", "email"])
    res.json(articles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// @route   GET api/articles/:id
// @desc    Get article by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate("author", ["username", "email"])

    if (!article) {
      return res.status(404).json({ msg: "Article not found" })
    }

    res.json(article)
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Article not found" })
    }
    res.status(500).send("Server Error")
  }
})

// @route   PUT api/articles/:id
// @desc    Update an article
// @access  Private (Admin and Editor only)
router.put("/:id", [auth], async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    const article = await Article.findById(req.params.id)

    if (!article) {
      return res.status(404).json({ msg: "Article not found" })
    }

    if (user.role !== "admin" && (user.role !== "editor" || article.author.toString() !== req.user.id)) {
      return res.status(403).json({ msg: "Not authorized to update this article" })
    }

    const { title, content, category, tags, status } = req.body

    if (title) article.title = title
    if (content) article.content = content
    if (category) article.category = category
    if (tags) article.tags = tags
    if (status && user.role === "admin") article.status = status

    article.lastModified = Date.now()

    await article.save()

    res.json(article)
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Article not found" })
    }
    res.status(500).send("Server Error")
  }
})

// @route   DELETE api/articles/:id
// @desc    Delete an article
// @access  Private (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")

    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Not authorized to delete articles" })
    }

    const article = await Article.findById(req.params.id)

    if (!article) {
      return res.status(404).json({ msg: "Article not found" })
    }

    await article.remove()

    res.json({ msg: "Article removed" })
  } catch (err) {
    console.error(err.message)
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Article not found" })
    }
    res.status(500).send("Server Error")
  }
})

// @route   GET api/articles/search
// @desc    Search articles
// @access  Public
router.get("/search", async (req, res) => {
  try {
    const { q, category, startDate, endDate } = req.query
    const query = { status: "published" }

    if (q) {
      query.$text = { $search: q }
    }

    if (category) {
      query.category = category
    }

    if (startDate || endDate) {
      query.publishDate = {}
      if (startDate) query.publishDate.$gte = new Date(startDate)
      if (endDate) query.publishDate.$lte = new Date(endDate)
    }

    const articles = await Article.find(query).sort({ publishDate: -1 }).populate("author", ["username", "email"])

    res.json(articles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

module.exports = router

