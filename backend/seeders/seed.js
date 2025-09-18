const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');

const testUsers = [
  {
    fullName: 'Test Student',
    email: 'test@echopind.com',
    password: 'test123',
    userType: 'student',
    school: 'EchoPind Academy',
    grade: 'Grade 10',
    phone: '123-456-7890'
  },
  {
    fullName: 'Demo Student',
    email: 'demo@echopind.com',
    password: 'eco123',
    userType: 'student',
    school: 'Green Valley School',
    grade: 'Grade 12',
    phone: '123-456-7891'
  },
  {
    fullName: 'Prof. Green',
    email: 'teacher@echopind.com',
    password: 'teach123',
    userType: 'teacher',
    school: 'EchoPind Academy',
    phone: '123-456-7892'
  },
  {
    fullName: 'Admin User',
    email: 'admin@echopind.com',
    password: 'admin123',
    userType: 'admin',
    phone: '123-456-7893'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Create test users
    for (const userData of testUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`Created user: ${user.email}`);
    }

    console.log('Database seeded successfully!');
    console.log('\nTest credentials:');
    testUsers.forEach(user => {
      console.log(`${user.userType}: ${user.email} / ${user.password}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seeder
seedDatabase();