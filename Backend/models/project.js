const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    techStack: [String],
    liveLing: {
        type: String,
    },
    githubLink: {
        type: String,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model("Project", projectSchema);