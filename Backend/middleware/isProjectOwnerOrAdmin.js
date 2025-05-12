const Project = require("../models/project");

async function isProjectOwnerOrAdmin(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        const isOwner = project.author?.toString() === req.user._id.toString();
        if (req.user.isAdmin || isOwner) {
            return next();
        }

        return res.status(403).json({ error: "Unauthorized access" });
    } catch (err) {
        return res.status(500).json({ error: "Server error", details: err.message });
    }
}

module.exports = isProjectOwnerOrAdmin;
