const express = require('express');
const router  = express.Router();
const Incident = require('../models/Incident');

// @route   GET /api/incidents
// @desc    Get all incidents (with optional search)
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title:       { $regex: search, $options: 'i' } },
          { disasterType:{ $regex: search, $options: 'i' } },
          { location:    { $regex: search, $options: 'i' } },
          { severity:    { $regex: search, $options: 'i' } },
          { reportedBy:  { $regex: search, $options: 'i' } }
        ]
      };
    }

    const incidents = await Incident.find(query).sort({ createdAt: -1 });
    res.json(incidents);
  } catch (error) {
    console.error('Fetch incidents error:', error);
    res.status(500).json({ message: 'Failed to fetch incidents', error: error.message });
  }
});

// @route   GET /api/incidents/:id
// @desc    Get single incident by ID
router.get('/:id', async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    res.json(incident);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch incident', error: error.message });
  }
});

// @route   POST /api/incidents
// @desc    Create a new incident
router.post('/', async (req, res) => {
  try {
    const { title, disasterType, location, severity, status, reportedBy, description } = req.body;

    if (!title || !disasterType || !location || !severity || !reportedBy) {
      return res.status(400).json({
        message: 'Please provide all required fields: title, disasterType, location, severity, reportedBy'
      });
    }

    const incident = new Incident({
      title:       title.trim(),
      disasterType,
      location:    location.trim(),
      severity,
      status:      status || 'Active',
      reportedBy:  reportedBy.trim(),
      description: description ? description.trim() : ''
    });

    const saved = await incident.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Create incident error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Failed to create incident', error: error.message });
  }
});

// @route   PUT /api/incidents/:id
// @desc    Update an existing incident
router.put('/:id', async (req, res) => {
  try {
    const { title, disasterType, location, severity, status, reportedBy, description } = req.body;

    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    if (title)       incident.title       = title.trim();
    if (disasterType)incident.disasterType= disasterType;
    if (location)    incident.location    = location.trim();
    if (severity)    incident.severity    = severity;
    if (status)      incident.status      = status;
    if (reportedBy)  incident.reportedBy  = reportedBy.trim();
    if (description !== undefined) incident.description = description.trim();

    const updated = await incident.save();
    res.json(updated);
  } catch (error) {
    console.error('Update incident error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Failed to update incident', error: error.message });
  }
});

// @route   DELETE /api/incidents/:id
// @desc    Delete an incident
router.delete('/:id', async (req, res) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }
    res.json({ message: 'Incident deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Delete incident error:', error);
    res.status(500).json({ message: 'Failed to delete incident', error: error.message });
  }
});

module.exports = router;
