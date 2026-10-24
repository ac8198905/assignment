const User     = require('../models/User');
const Incident = require('../models/Incident');

// ──────────────────────────────────────────────
// Default admin user for the demo
// ──────────────────────────────────────────────
const INITIAL_USERS = [
  {
    name:     'Admin User',
    email:    'admin@disastermgmt.gov',
    password: 'password123',
    role:     'admin'
  }
];

// ──────────────────────────────────────────────
// Sample disaster incidents for demo purposes
// ──────────────────────────────────────────────
const INITIAL_INCIDENTS = [
  {
    title:       'Severe Flash Flooding — River District',
    disasterType:'Flood',
    location:    'District 4, Chennai, Tamil Nadu',
    severity:    'Critical',
    status:      'Active',
    reportedBy:  'NDRF Team Alpha',
    description: 'Multiple residential zones submerged. Over 500 families displaced. Emergency rescue operations underway.'
  },
  {
    title:       'Magnitude 5.8 Earthquake — Coastal Region',
    disasterType:'Earthquake',
    location:    'Coastal Belt, Gujarat',
    severity:    'High',
    status:      'Active',
    reportedBy:  'State Emergency Cell',
    description: 'Tremors felt across 120 km radius. 14 buildings reported damaged. Aftershocks expected.'
  },
  {
    title:       'Wildfire Spread — Northern Forest Zone',
    disasterType:'Wildfire',
    location:    'Uttarakhand Forest Reserve, Sector 7',
    severity:    'High',
    status:      'Contained',
    reportedBy:  'Forest Fire Control Unit',
    description: 'Fire contained on northern front. Southern flank still being monitored. 200 hectares affected.'
  },
  {
    title:       'Landslide Blocks National Highway',
    disasterType:'Landslide',
    location:    'NH-44, Himachal Pradesh, KM 212',
    severity:    'Medium',
    status:      'Active',
    reportedBy:  'Highway Patrol — Sector 3',
    description: 'Highway blocked in both directions. Heavy machinery deployed for clearance. No casualties reported.'
  },
  {
    title:       'Industrial Chemical Leak — Port Area',
    disasterType:'Industrial Accident',
    location:    'Visakhapatnam Port, Zone B',
    severity:    'Critical',
    status:      'Contained',
    reportedBy:  'APPCB Hazmat Team',
    description: 'Ammonia leak from storage tank. 1 km exclusion zone established. 3 workers hospitalized.'
  },
  {
    title:       'Dengue Fever Outbreak',
    disasterType:'Disease Outbreak',
    location:    'Anand Nagar, Rajasthan',
    severity:    'Medium',
    status:      'Active',
    reportedBy:  'District Health Officer',
    description: '87 confirmed cases in past 10 days. Mobile medical units deployed. Vector control spray underway.'
  },
  {
    title:       'Cyclone Approach — Eastern Coastline',
    disasterType:'Hurricane / Cyclone',
    location:    'Odisha Coast, Puri District',
    severity:    'Critical',
    status:      'Active',
    reportedBy:  'India Meteorological Dept.',
    description: 'Category 3 cyclone expected landfall in 36 hours. Evacuation of 12 coastal villages initiated.'
  },
  {
    title:       'Old Bridge Structural Collapse',
    disasterType:'Building Collapse',
    location:    'Patna, Bihar — Ganga Bridge',
    severity:    'High',
    status:      'Resolved',
    reportedBy:  'Bihar Disaster Management Authority',
    description: 'Partial collapse reported. 2 vehicles affected. Bridge sealed. Investigation team deployed.'
  }
];

// ──────────────────────────────────────────────
// Seed function
// ──────────────────────────────────────────────
const seedDatabase = async () => {
  try {
    // 1. Seed admin user if not present
    const adminExists = await User.findOne({ email: 'admin@disastermgmt.gov' });
    if (!adminExists) {
      console.log('Seeding default admin user...');
      for (const u of INITIAL_USERS) {
        await User.create(u);
      }
      console.log('✅ Admin seeded: admin@disastermgmt.gov / password123');
    }

    // 2. Seed incidents if collection is empty
    const count = await Incident.countDocuments();
    if (count === 0) {
      console.log('Seeding initial disaster incidents...');
      await Incident.insertMany(INITIAL_INCIDENTS);
      console.log(`✅ Seeded ${INITIAL_INCIDENTS.length} disaster incidents.`);
    }
  } catch (error) {
    console.error('❌ Database seeding error:', error.message);
  }
};

module.exports = seedDatabase;
