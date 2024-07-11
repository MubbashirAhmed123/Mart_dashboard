import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import { toast } from 'react-toastify';
import useAuth from '../utils/useAuth';

const EditCategory = () => {
  const { id } = useParams(); // Assuming your route includes category ID
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    categoryname: '',
    sequence: '',
    status: 'Inactive',
    imagefile: null
  });

  

  const fetchCategory = async () => {
    try {
      const response = await fetch(`http://localhost:3001/categories/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch category');
      }
      const data = await response.json();
      setCategory({
        categoryname: data.category.categoryname,
        sequence: data.category.sequence,
        status: data.category.status,
        imagefile: data.category.imagefile
      });
    } catch (error) {
      toast.error('Error fetching category:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory(prevCategory => ({
      ...prevCategory,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setCategory(prevCategory => ({
      ...prevCategory,
      imagefile: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('categoryname', category.categoryname);
    formData.append('sequence', category.sequence);
    formData.append('status', category.status);
    if (category.imagefile) {
      formData.append('imagefile', category.imagefile);
    }

    try {
      const response = await fetch(`http://localhost:3001/edit-category/${id}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }
      const data=await response.json()
      toast.success(data.msg)
      navigate('/category'); // Redirect to category list after successful update
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
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Category</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-10">
          <div className="mb-4">
            <label className=" text-gray-700">Category Name</label>
            <input
              type="text"
              name="categoryname"
              value={category.categoryname}
              onChange={handleChange}
              className=" w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition"
              required
            />
          </div>
          <div className="mb-4">
            <label className=" text-gray-700">Status</label>
            <select
              name="status"
              value={category.status}
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
              value={category.sequence}
              onChange={handleChange}
              className=" w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition"
              required
            />
          </div>
          <div className="md:flex items-center gap-4 md:col-span-2">
    <div>
      <h1>Uploaded Image</h1>
      <img
        src={`http://localhost:3001/uploads/${category.imagefile}`}
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

export default EditCategory;
