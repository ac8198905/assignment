const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// @route   GET /api/candidates
// @desc    Get all candidates
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { fullName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { jobPosition: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const candidates = await Candidate.find(query).sort({ createdAt: -1 });
    res.json(candidates);
  } catch (error) {
    console.error('Fetch candidates error:', error);
    res.status(500).json({ message: 'Failed to fetch candidates', error: error.message });
  }
});

// @route   GET /api/candidates/:id
// @desc    Get single candidate by ID
router.get('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch candidate', error: error.message });
  }
});

// @route   POST /api/candidates
// @desc    Create a new candidate
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, jobPosition, status } = req.body;

    if (!fullName || !email || !phone || !jobPosition) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const candidate = new Candidate({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      jobPosition: jobPosition.trim(),
      status: status || 'Applied'
    });

    const savedCandidate = await candidate.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    console.error('Create candidate error:', error);
    res.status(500).json({ message: 'Failed to create candidate', error: error.message });
  }
});

// @route   PUT /api/candidates/:id
// @desc    Update a candidate
router.put('/:id', async (req, res) => {
  try {
    const { fullName, email, phone, jobPosition, status } = req.body;

    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    if (fullName) candidate.fullName = fullName.trim();
    if (email) candidate.email = email.toLowerCase().trim();
    if (phone) candidate.phone = phone.trim();
    if (jobPosition) candidate.jobPosition = jobPosition.trim();
    if (status) candidate.status = status;

    const updatedCandidate = await candidate.save();
    res.json(updatedCandidate);
  } catch (error) {
    console.error('Update candidate error:', error);
    res.status(500).json({ message: 'Failed to update candidate', error: error.message });
  }
});

// @route   DELETE /api/candidates/:id
// @desc    Delete a candidate
router.delete('/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.json({ message: 'Candidate deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Delete candidate error:', error);
    res.status(500).json({ message: 'Failed to delete candidate', error: error.message });
  }
});

module.exports = router;
