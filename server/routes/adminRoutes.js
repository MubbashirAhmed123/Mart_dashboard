const express=require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db=require('../config')
const authMiddleware = require('../middleware/auth');

require('dotenv').config()

const router=express.Router()

router.get('/login',authMiddleware,(req,res)=>{
    res.json({ msg: 'Welcome to dashboard.', user: req.user });

})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body)
  
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
    
    db.query('SELECT * FROM admin WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Database query error:', err.message);
        return res.status(500).send('Database query error');
      }
  
      if (results.length === 0) {
        return res.status(401).send({msg:'Invalid email or password'});
      }
      

      // console.log(results)
  
      const user = results[0];
  
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          // console.error('Bcrypt error:', err.message);
          return res.status(500).send({msg:'Internal server error'});
        }
  
        if (!isMatch) {
          return res.status(401).send({msg:'Invalid email or password'});
        }
  
        const token = jwt.sign({ id: user.adminid, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        
        res.json({msg:'Login Successfully.', token });
      });

    });
  });

module.exports=router