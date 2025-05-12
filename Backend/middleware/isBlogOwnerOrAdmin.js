const Blog = require('../models/blogPost');

async function isBlogOwnerOrAdmin(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    const isOwner = blog.author.toString() === req.user._id.toString();
    if (req.user.isAdmin || isOwner) {
      return next();
    }

    return res.status(403).json({ error: 'You are not authorized to perform this action' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = isBlogOwnerOrAdmin;
