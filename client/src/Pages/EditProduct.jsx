import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import { toast } from 'react-toastify';
import useAuth from '../utils/useAuth';

const EditProduct = () => {
  const { id } = useParams(); // Assuming your route includes category ID
  const navigate = useNavigate();
  const [product, setproduct] = useState({
    productname: '',
    subcategoryname:'Fortune',
    category:'Ghee and oils',
    status: 'Inactive',
    sequence: '',
    imagefile: null
  });



  const fetchCategory = async () => {
    try {
      const response = await fetch(`http://localhost:3001/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product.');
      }
      const data = await response.json();
      setproduct({
        productname:data.product.productname,
        subcategoryname:data.product.subcategoryname,
        category: data.product.category,
        sequence: data.product.sequence,
        status: data.product.status,
        imagefile: data.product.imagefile
      });
    } catch (error) {
      toast.error('Error fetching products.', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setproduct(prevCategory => ({
      ...prevCategory,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setproduct(prevCategory => ({
      ...prevCategory,
      imagefile: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productname', product.productname);
    formData.append('subcategoryname',product.subcategoryname)
    formData.append('category',product.category)
    formData.append('sequence', product.sequence);
    formData.append('status', product.status);
    if (product.imagefile) {
      formData.append('imagefile', product.imagefile);
    }
    try {
      const response = await fetch(`http://localhost:3001/edit-product/${id}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }
      const data=await response.json()
      toast.success(data.msg)
      navigate('/products'); // Redirect to category list after successful update
    } catch (error) {
      toast.error('Error updating category:', error.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);
  useAuth()


  return (
<div className="flex flex-col md:flex-row">
      <Sidebar />
    <div className="">
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-10">
         
        <div className='mb-4'>
              <label className=" text-gray-700">Category</label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition"
                 
              >
                <option value="Ghee and oils" >Ghee and oils</option>
                <option value="Attas and Flours">Attas and Flours</option>
               
              </select>
            </div>

            <div className='mx-4'>
            <label className=" text-gray-700">Sub Category</label>
              <select
                name="subcategoryname"
                value={product.subcategoryname}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition"
                 
              >
                <option value="Fortune" >Fortune</option>
                <option value="Wheat">Wheat</option>
               


              </select>
            </div>

            <div>
              <label className=" text-gray-700">Product Name</label>
              <input
                type="text"
                name="productname"
                value={product.productname}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition"
                 
              />
            </div>

          <div className="mb-4">
            <label className=" text-gray-700">Status</label>
            <select
              name="status"
              value={product.status}
              onChange={handleChange}
              className=" w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition"
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="mb-4">
            <label className=" text-gray-700">Sequence Number</label>
            <input
              type="number"
              name="sequence"
              value={product.sequence}
              onChange={handleChange}
              className=" w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition"
              required
            />
          </div>
          <div className="md:flex items-center gap-4 md:col-span-2">
    <div>
      <h1>Uploaded Image</h1>
      <img
        src={`http://localhost:3001/uploads/${product.imagefile?product.imagefile:''}`}
        alt=""
        className="w-20 border-2 border-gray-300 p-2 md:w-[200px]"
      />
    </div>
    <label className="block text-gray-700 md:block md:ml-4">Image</label>
    <input
      type="file"
      name="image"
      onChange={handleFileChange}
      className="w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition md:w-auto"
    />
  </div>
          <div className='mt-5 md:absolute bottom-20 right-10 flex gap-10'>
            <button className="w-[150px] bg-purple-600 text-white py-2 rounded-2xl hover:bg-purple-700 focus:ring ring-purple-600 transition" type="submit">
              Edit
            </button>
            <button className="w-[150px] bg-gray-100 text-black border-2 border-gray-400 py-2 rounded-2xl hover:bg-purple-700 focus:ring ring-purple-600 transition" type="button" onClick={()=>navigate(-1)}>
              Cancel
            </button>
            </div>
        </form>
      </div>
    </div>
  </div>
   
  );
};

export default EditProduct;
