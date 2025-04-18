import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import  Admin from '../models/Admin.js'

// Sample admin data
const sampleAdmins = [
  {
    name: "prashant",
    email: "kumarprashant8986@gmail.com",
    password: "prashant",
    department: "Finance"
  },
  {
    name: "kunal",
    email: "kunal@gmail.com",
    password: "kunal",
    department: "IT"
  },
  {
    name: "debo",
    email: "debo@gmail.com",
    password: "debo",
    department: "Hostel"
  },
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/vit-helpdesk-copy', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Function to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Insert admins
const insertAdmins = async () => {
  try {
    // Clear existing admins
    await Admin.deleteMany({});
    console.log('Cleared existing admins');

    // Insert new admins
    for (const admin of sampleAdmins) {
      // const hashedPassword = await hashPassword(admin.password);
      await Admin.create({
        name: admin.name,
        email: admin.email,
        password: admin.password,
        department: admin.department
      });
      console.log(`Created admin: ${admin.name}`);
    }

    console.log('All admins inserted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error inserting admins:', error);
    process.exit(1);
  }
};

// Run the insertion
insertAdmins();