import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import { toast } from 'react-toastify';
import useAuth from '../utils/useAuth';

const AddCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: '',
    status: 'Inactive',
    sequence: '',
    image: null
  });



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
      image: e.target.files[0]
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const{name,status,sequence,image}=category
    if(!name || !status || !sequence || !image){
      toast.error('All fields are required.')
      return
    }

    const formData = new FormData();
    formData.append('categoryname', category.name);
    formData.append('sequence', category.sequence);
    formData.append('status', category.status);
    if (category.image) {
      formData.append('imagefile', category.image);
    }

    try {
      const response = await fetch('http://localhost:3001/add-category', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Category added successfully.', result);
        navigate('/category')
      } else {
        toast.error('Error adding category.', result.msg || 'Server Error');
      }
    } catch (error) {
      toast.error('Error adding category.', error);
    }
  };

 useAuth()


  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="">
        <div className="p-5">
          <h2 className="text-2xl font-bold mb-6 text-center">Add Category</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-10">
            <div>
              <label className="block text-gray-700">Category Name</label>
              <input
                type="text"
                name="name"
                value={category.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition"
                 
              />
            </div>
            <div>
              <label className="block text-gray-700">Status</label>
              <select
                name="status"
                value={category.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition"
                 
              >
                <option value="Active" >Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Sequence Number</label>
              <input
                type="number"
                name="sequence"
                value={category.sequence}
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

export default AddCategory;
