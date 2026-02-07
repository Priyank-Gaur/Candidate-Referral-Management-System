const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number'],
        match: [
             /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
             'Please add a valid phone number'
        ]
    },
    jobTitle: {
        type: String,
        required: [true, 'Please add a job title']
    },
    status: {
        type: String,
        enum: ['Pending', 'Reviewed', 'Hired', 'Rejected'],
        default: 'Pending'
    },
    resumeUrl: {
        type: String,
        required: [true, 'Please add a resume URL']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Candidate', CandidateSchema);
