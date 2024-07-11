import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import { toast } from 'react-toastify';
import useAuth from '../utils/useAuth';

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productname:'',
    subcategoryname:'Fortune',
    category:'Ghee and oils',
    status: 'Inactive',
    sequence: '',
    image: null
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      image: e.target.files[0]
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const{productname,subcategoryname,category,status,sequence,image}=product

    if(!productname ||!category|| !subcategoryname|| !status|| !sequence|| !image){
      toast.error('All fields are required!')
      return
    }

    const formData = new FormData();

    formData.append('productname',product.productname);
    formData.append('subcategoryname',product.subcategoryname)
    formData.append('category',product.category)
    formData.append('sequence',product.sequence);
    formData.append('status',product.status);
    if (product.image) {
      formData.append('imagefile', product.image);
    }

    try {
      const response = await fetch('http://localhost:3001/add-product', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Product added successfully.', result);
        navigate('/products')
      } else {
        toast.error('Error adding product.', result.msg || 'Server Error');
      }
    } catch (error) {
      toast.error('Error adding product.', error);
    }
  };

  useAuth()


  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="">
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-6 ">Add Product</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-10 ">

          <div>
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

          <div>
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
            <div>
              <label className=" text-gray-700">Status</label>
              <select
                name="status"
                value={product.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition"
                 
              >
                <option value="Active" >Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className=" text-gray-700">Sequence Number</label>
              <input
                type="number"
                name="sequence"
                value={product.sequence}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition"
                 
              />
            </div>
            <div>
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition md:w-[300px]"
                 
              />
            </div>

            <div className='mt-5 md:absolute bottom-20 right-10 flex gap-10'>
            <button className="w-[150px] bg-purple-600 text-white py-2 rounded-2xl border-2 border-gray-600 hover:bg-transparent hover:text-black focus:ring ring-purple-600 transition" type="submit">
              Add
            </button>
            <button className="w-[150px] bg-gray-100 text-black border-2 border-gray-400 py-2 rounded-2xl hover:bg-purple-500 hover:text-white focus:ring ring-purple-600 transition" type="button" onClick={()=>navigate(-1)}>
              Cancel
            </button>
            </div>
           
          </form>
        </div>
      </div>
    </div>

  );
};

export default AddProduct;
