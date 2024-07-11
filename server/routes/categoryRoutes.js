const express=require('express');
const multer = require('multer');
const db=require('../config')

const router=express.Router()


//storage of images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+ '_'+ file.originalname);
    }
  });
  
  const upload = multer({ storage });


  // API endpoint to add category

router.post('/add-category', upload.single('imagefile'), (req, res) => {
    const { categoryname, sequence, status } = req.body;
    // console.log(req.body)
    // console.log('Uploaded File:', req.file);

    const imagefile = req.file ? req.file.filename : null;
  
    if (!categoryname || !sequence || !status || !imagefile) {
      return res.status(400).json({ msg: 'Please include all fields' });
    }
  
    const category = { categoryname, sequence, status, imagefile };
  
    const sql = 'INSERT INTO categories SET ?';
  
    db.query(sql, category, (err, result) => {
      if (err) {
        return res.status(500).json({ msg: 'Database error', error: err });
      }
      res.status(201).json({ msg: 'Category added successfully.', categoryId: result.insertId });
    });
  });
  
  // API endpoint to retrieve all categories
  router.get('/categories', (req, res) => {
    const sql = 'SELECT * FROM categories';
  
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ msg: 'Database error', error: err });
      }
      res.status(200).json({ categories: results });
    });
  });

  router.get('/categories/:id', (req, res) => {
    const categoryId = req.params.id;
  
    const sql = 'SELECT * FROM categories WHERE id = ?';
    db.query(sql, [categoryId], (err, result) => {
      if (err) {
        // console.error('Error fetching category:', err);
        return res.status(500).json({ error: 'Failed to fetch category' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      const category = result[0];
      // console.log(category.imagefile.toString())
      res.status(200).json({
        category: {
          id: category.id,
          categoryname: category.categoryname,
          sequence: category.sequence,
          status: category.status,
          imagefile: category.imagefile.toString() 
        }
      });
    });
  });
  
  // API endpoint to edit a category
  router.put('/edit-category/:id', upload.single('imagefile'), (req, res) => {
    const { id } = req.params;
    const { categoryname, sequence, status } = req.body;
    const imagefile = req.file ? req.file.filename : null;
  
    let updateFields = { categoryname, sequence, status };
    if (imagefile) {
      updateFields.imagefile = imagefile;
    }

    // console.log(updateFields)
  
    const sql = 'UPDATE categories SET ? WHERE id = ?';
  
    db.query(sql, [updateFields, id], (err, result) => {
      if (err) {
        return res.status(500).json({ msg: 'Database error', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: 'Category not found.' });
      }
      res.status(200).json({ msg: 'Category updated successfully.' });
    });
  });

    // API endpoint to delete a category
  router.delete('/delete-category/:id', (req, res) => {
    const categoryId = req.params.id;
  
    const sql = 'DELETE FROM categories WHERE id = ?';
  
    db.query(sql, [categoryId], (err, result) => {
      if (err) {
        // console.error('Error deleting category:', err);
        return res.status(500).json({ error: 'Failed to delete category.' });
      }
  
      res.status(200).json({ msg: 'Category deleted successfully.' });
    });
  });

  module.exports=router