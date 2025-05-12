const express = require("express");
const router = express.Router();
const Blog = require("../models/blogPost.js");
const isBlogOwnerOrAdmin = require('../middleware/isBlogOwnerOrAdmin.js');

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

router.post('/', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "You must be logged in" });
  }

  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  let tagsArray = [];
  if (Array.isArray(tags)) {
    tagsArray = tags;
  } else if (typeof tags === 'string' && tags.trim() !== '') {
    tagsArray = tags.split(',').map(tag => tag.trim());
  }

  const newBlog = new Blog({
    title,
    content,
    tags: tagsArray,
    createdAt: new Date(),
    author: req.user._id
  });

  try {
    await newBlog.save();
    res.status(201).json({ success: true, blog: newBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});



// PUT (update) an existing blog
router.put('/:id', isBlogOwnerOrAdmin, async (req, res) => {
  const { title, content, tags } = req.body;

  // Validate required fields
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, tags },
      { new: true } // Return the updated blog
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ success: true, blog: updatedBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// GET a single blog by ID (optional)
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the blog' });
  }
});

// DELETE a blog by ID
router.delete('/:id', isBlogOwnerOrAdmin, async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete the blog post' });
  }
});

module.exports = router;
