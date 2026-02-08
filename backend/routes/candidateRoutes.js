const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, candidateController.createCandidate);
router.get('/', protect, candidateController.getCandidates);
router.put('/:id/status', protect, candidateController.updateCandidateStatus);
router.delete('/:id', protect, candidateController.deleteCandidate);

module.exports = router;
