const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const router = express.Router();

// 1. Check if an admin account already exists
router.get('/check', async (req, res) => {
  const admin = await Admin.findOne();
  res.json({ isSetup: !!admin });
});

// 2. First-Time Setup: Create Admin
router.post('/setup', async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists!" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newAdmin = new Admin({ phone: req.body.phone, password: hashedPassword });
    
    await newAdmin.save();
    res.json({ message: "Account setup successful!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Login Route
router.post('/login', async (req, res) => {
  try {
    const admin = await Admin.findOne({ phone: req.body.phone });
    if (!admin) return res.status(401).json({ success: false, message: "Invalid Phone Number or Password" });

    const isMatch = await bcrypt.compare(req.body.password, admin.password);
    if (isMatch) res.json({ success: true, message: "Login successful!" });
    else res.status(401).json({ success: false, message: "Invalid Phone Number or Password" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get Admin Phone for WhatsApp Links
router.get('/phone', async (req, res) => {
  try {
    const admin = await Admin.findOne();
    res.json({ phone: admin ? admin.phone : "919000000000" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Update Admin Phone or Password
router.put('/update', async (req, res) => {
  const { currentPassword, newPhone, newPassword } = req.body;

  try {
    const admin = await Admin.findOne();
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Current password incorrect!" });

    if (newPhone) admin.phone = newPhone;
    if (newPassword) admin.password = await bcrypt.hash(newPassword, 10);

    await admin.save();
    res.json({ success: true, message: "Credentials updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;