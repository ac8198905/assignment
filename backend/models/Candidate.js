const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  jobPosition: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    default: 'Applied'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      return ret;
    }
  }
});

module.exports = mongoose.model('Candidate', candidateSchema);
