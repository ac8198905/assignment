const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    disasterType: {
      type: String,
      required: true,
      trim: true,
      enum: [
        'Flood',
        'Earthquake',
        'Hurricane / Cyclone',
        'Wildfire',
        'Tsunami',
        'Landslide',
        'Drought',
        'Tornado',
        'Industrial Accident',
        'Disease Outbreak',
        'Building Collapse',
        'Other'
      ]
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    severity: {
      type: String,
      required: true,
      enum: ['Critical', 'High', 'Medium', 'Low'],
      default: 'Medium'
    },
    status: {
      type: String,
      enum: ['Active', 'Contained', 'Resolved'],
      default: 'Active'
    },
    reportedBy: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      default: ''
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        return ret;
      }
    }
  }
);

module.exports = mongoose.model('Incident', incidentSchema);
