const express = require('express');
const cors = require('cors');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const { Property, User, Contact, Document, sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});
const upload = multer({ storage: storage });

const SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret_key';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Admin Login Route
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Customer Register
app.post('/api/user/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    
    const token = jwt.sign({ id: user.id, role: 'user' }, SECRET_KEY, { expiresIn: '24h' });
    res.status(201).json({ token, user: { name: user.name, email: user.email, avatar: user.avatar, kycStatus: user.kycStatus } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Customer Login
app.post('/api/user/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: 'user' }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token, user: { name: user.name, email: user.email, avatar: user.avatar, kycStatus: user.kycStatus } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ message: 'Message received', contact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Get all users
app.get('/api/admin/users', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Get all contacts
app.get('/api/admin/contacts', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin: Delete contact
app.delete('/api/admin/contacts/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.sendStatus(403);
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Not found' });
    
    await contact.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update Profile (Protected)
app.put('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { name, avatar } = req.body;
    if (name) user.name = name;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();
    res.json({ user: { name: user.name, email: user.email, avatar: user.avatar, kycStatus: user.kycStatus } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Change Password (Protected)
app.put('/api/user/password', authenticateToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Incorrect old password' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit KYC (Protected)
app.post('/api/user/kyc', authenticateToken, upload.fields([{ name: 'nidFront', maxCount: 1 }, { name: 'nidBack', maxCount: 1 }]), async (req, res) => {
  try {
    const { nidNumber } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (nidNumber) user.nidNumber = nidNumber;
    
    if (req.files && req.files['nidFront']) {
      user.nidFrontUrl = `http://localhost:${PORT}/uploads/${req.files['nidFront'][0].filename}`;
    }
    if (req.files && req.files['nidBack']) {
      user.nidBackUrl = `http://localhost:${PORT}/uploads/${req.files['nidBack'][0].filename}`;
    }

    user.kycStatus = 'Pending';
    await user.save();

    res.json({ success: true, kycStatus: user.kycStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Vault: Get Documents (Protected)
app.get('/api/vault', authenticateToken, async (req, res) => {
  try {
    const documents = await Document.findAll({ where: { userId: req.user.id } });
    res.json(documents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Vault: Upload Document (Protected)
app.post('/api/vault', authenticateToken, upload.single('document'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    
    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    // Get file size in MB
    const sizeInMB = (req.file.size / (1024 * 1024)).toFixed(2) + ' MB';
    
    // Type derived from mimetype
    let type = req.file.mimetype.includes('image') ? 'Image' : 'PDF';
    if (req.file.mimetype.includes('word')) type = 'DOC';

    const newDoc = await Document.create({
      userId: req.user.id,
      title: req.body.title || req.file.originalname,
      fileUrl,
      type,
      size: sizeInMB
    });

    res.status(201).json(newDoc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Image Upload Route (Protected)
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ imageUrl: `http://localhost:${PORT}/uploads/${req.file.filename}` });
});

// Get all properties, optionally filtered by type
app.get('/api/properties', async (req, res) => {
  try {
    const { type } = req.query;
    const filter = type ? { where: { type } } : {};
    const properties = await Property.findAll(filter);
    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add Property (Protected)
app.post('/api/properties', authenticateToken, async (req, res) => {
  try {
    const newProperty = await Property.create({
      id: 'p' + Date.now(), // Generate simple unique ID
      ...req.body
    });
    res.status(201).json(newProperty);
  } catch (error) {
    console.error('Error adding property:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Edit Property (Protected)
app.put('/api/properties/:id', authenticateToken, async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ error: 'Not found' });
    
    await property.update(req.body);
    res.json(property);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete Property (Protected)
app.delete('/api/properties/:id', authenticateToken, async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) return res.status(404).json({ error: 'Not found' });
    
    await property.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Sync database and start server
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
