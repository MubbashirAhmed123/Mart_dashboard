const express = require('express');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config'); 
require('dotenv').config()
const router = express.Router();

// Forgot Password Route
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  // Check if admin exists
  db.query('SELECT * FROM admin WHERE email = ?', [email], (err, result) => {
    if (err) throw err;
    if (result.length === 0) return res.status(404).json({ msg: 'Admin not found' });

    const user = result[0];
    const token = jwt.sign({ id: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    // Send email with the reset link
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host:'smtp.gmail.com',
      port:465,
      secure:true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      to: email,
      subject: 'Password Reset',
      text: `Click the link to reset your password: ${resetLink}`
    };
    // console.log(mailOptions)

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).json({ msg: 'Error sending email' });
      res.json({ msg: 'Password reset link sent to your email' });
    });
  });
});

// Reset Password Route
router.post('/reset-password/:token', (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  // console.log(req.body)

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.status(400).json({ msg: 'Invalid or expired token' });

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    db.query('UPDATE admin SET password = ?', [hashedPassword, decoded.email], (err, result) => {
      if (err) throw err;
      res.json({ msg: 'Password reset successfully' });
    });
  });
});

module.exports = router;
