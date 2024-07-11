const express=require('express');
const multer = require('multer');
const db=require('../config')

const router=express.Router()



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+ '_'+ file.originalname);
    }
  });
  
  const upload = multer({ storage });

  // API endpoint to add sub category
router.post('/add-sub-category', upload.single('imagefile'), (req, res) => {
    const { categoryname, subcategoryname,sequence, status } = req.body;
    // console.log(req.body)
    // console.log('Uploaded File:', req.file);

    const imagefile = req.file ? req.file.filename : null;
  
  
    const subcategory = { categoryname, subcategoryname, sequence, status, imagefile };
  
    const sql = 'INSERT INTO sub_categories SET ?';
  
    db.query(sql, subcategory, (err, result) => {
      if (err) {
        return res.status(500).json({ msg: 'Database error', error: err });
      }
      res.status(201).json({ msg: 'Sub Category added successfully.', categoryId: result.insertId });
    });
  });
  
  // API endpoint to retrieve all categories
  router.get('/sub-categories', (req, res) => {
    const sql = 'SELECT * FROM sub_categories';
  
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ msg: 'Database error', error: err });
      }
      res.status(200).json({ categories: results });
    });
  });


    // API endpoint to retrieve single sub category
  router.get('/sub-categories/:id', (req, res) => {
    const categoryId = req.params.id;
  
    const sql = 'SELECT * FROM sub_categories WHERE id = ?';
    db.query(sql, [categoryId], (err, result) => {
      if (err) {
        // console.error('Error fetching category:', err);
        return res.status(500).json({ error: 'Failed to fetch sub category.' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ error: 'Sub category not found.' });
      }
  
      const subcategory = result[0];
      // console.log(subcategory.imagefile.toString())
      res.status(200).json({
        category: {
          id: subcategory.id,
          categoryname: subcategory.categoryname,
          subcategoryname:subcategory.subcategoryname,
          sequence: subcategory.sequence,
          status: subcategory.status,
          imagefile: subcategory.imagefile.toString() // Assuming 'imagefile' is the column name for image
        }
      });
    });
  });
  
  // API endpoint to edit a category
  router.put('/edit-sub-category/:id', upload.single('imagefile'), (req, res) => {
    const { id } = req.params;
    const { categoryname, subcategoryname, sequence, status } = req.body;
    const imagefile = req.file ? req.file.filename : null;
  
  
  
    let updateFields = { categoryname, subcategoryname, sequence, status };
    if (imagefile) {
      updateFields.imagefile = imagefile;
    }

    // console.log(updateFields)
  
    const sql = 'UPDATE sub_categories SET ? WHERE id = ?';
  
    db.query(sql, [updateFields, id], (err, result) => {
      if (err) {
        return res.status(500).json({ msg: 'Database error', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: 'Sub category not found.' });
      }
      res.status(200).json({ msg: 'Sub Category updated successfully.' });
    });
  });


  // API endpoint to delete a sub category
  router.delete('/delete-sub-category/:id', (req, res) => {
    const categoryId = req.params.id;
  
    const sql = 'DELETE FROM sub_categories WHERE id = ?';
  
    db.query(sql, [categoryId], (err, result) => {
      if (err) {
        // console.error('Error deleting category:', err);
        return res.status(500).json({ error: 'Failed to delete category' });
      }
  
      res.status(200).json({ msg: 'Sub category deleted successfully.' });
    });
  });

  module.exports=router