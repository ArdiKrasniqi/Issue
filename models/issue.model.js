const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IssueSchema = new Schema({
    title: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    resolved: {
        type: Boolean,
        default: false
    },
    resolved_at: Date
})

const Issue = mongoose.model('Issue', IssueSchema);
module.exports = Issue;