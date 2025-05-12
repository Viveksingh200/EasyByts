
const isAdmin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'You must be logged in to perform this action' });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({ error: 'You do not have permission to perform this action' });
  }

  next(); 
};

module.exports = isAdmin;
