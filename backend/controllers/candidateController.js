const Candidate = require('../models/Candidate');

exports.createCandidate = async (req, res) => {
    try {
        const { name, email, phone, jobTitle, resumeUrl } = req.body;

        const candidate = new Candidate({
            name,
            email,
            phone,
            jobTitle,
            resumeUrl
        });

        await candidate.save();
        res.status(201).json(candidate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ createdAt: -1 });
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateCandidateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['Pending', 'Reviewed', 'Hired', 'Rejected'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const candidate = await Candidate.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        res.status(200).json(candidate);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);

        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found' });
        }

        await candidate.deleteOne();
        res.status(200).json({ message: 'Candidate deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
