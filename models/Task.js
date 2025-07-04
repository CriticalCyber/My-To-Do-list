const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    completed: { type: Boolean, default: false },
    date: String, // YYYY-MM-DD
    // ...other fields
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);