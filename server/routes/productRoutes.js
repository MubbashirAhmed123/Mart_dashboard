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


  // API endpoint to add product
router.post('/add-product', upload.single('imagefile'), (req, res) => {
    const { productname, subcategoryname, category,sequence, status } = req.body;
    // console.log(req.body)
    // console.log('Uploaded File:', req.file);

    const imagefile = req.file ? req.file.filename : null;
  
   
  
    const product = { productname, subcategoryname, category, sequence, status, imagefile };
  
    const sql = 'INSERT INTO products SET ?';
  
    db.query(sql, product, (err, result) => {
      if (err) {
        // console.log('err',err)
        return res.status(500).json({ msg: 'Database error.', error: err });
      }
      res.status(201).json({ msg: 'Product added.', productId: result.insertId });
    });
  });

  


  
  // API endpoint to retrieve all products
  router.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
  
    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({ msg: 'Database error.', error: err });
      }
      res.status(200).json({ products: results });
    });
  });


  // API endpoint to retrieve single product
  router.get('/products/:id', (req, res) => {
    const productId = req.params.id;
  
    const sql = 'SELECT * FROM products WHERE id = ?';
    db.query(sql, [productId], (err, result) => {
      if (err) {
        // console.error('Error fetching category:', err);
        return res.status(500).json({ error: 'Failed to fetch products.' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ error: 'Product not found.' });
      }
  
      const product = result[0];

      res.status(200).json({
        product: {
          id: product.id,
          productname: product.productname,
          subcategoryname:product.subcategoryname,
          category:product.category,
          sequence: product.sequence,
          status: product.status,
          imagefile: product.imagefile.toString() // Assuming 'imagefile' is the column name for image
        }
      });
    });
  });
  
  // API endpoint to edit a product
  router.put('/edit-product/:id', upload.single('imagefile'), (req, res) => {
    const { id } = req.params;
    // console.log(req.body)
    // console.log('req.file',req.file)
    const { productname, subcategoryname, category,sequence, status } = req.body;
    
    const imagefile = req.file ? req.file.filename : null;
  
  
    let updateFields = { productname, subcategoryname, category, sequence, status };
    if (imagefile) {
      updateFields.imagefile = imagefile;
    }

    // console.log(updateFields)
  
    const sql = 'UPDATE products SET ? WHERE id = ?';
  
    db.query(sql, [updateFields, id], (err, result) => {
      if (err) {
        return res.status(500).json({ msg: 'Database error', error: err });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ msg: 'Product not found.' });
      }
      res.status(200).json({ msg: 'Product updated successfully.' });
    });
  });



    // API endpoint to delete a product
  router.delete('/delete-product/:id', (req, res) => {
    const productId = req.params.id;
  
    const sql = 'DELETE FROM products WHERE id = ?';
  
    db.query(sql, [productId], (err, result) => {
      if (err) {
        // console.error('Error deleting product:', err);
        return res.status(500).json({ error: 'Failed to delete product.' });
      }
  
      res.status(200).json({ msg: 'Product deleted successfully.' });
    });
  });

  module.exports=router