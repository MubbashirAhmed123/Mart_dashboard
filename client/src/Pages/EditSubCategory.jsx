import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import { toast } from 'react-toastify';
import useAuth from '../utils/useAuth';

const EditSubCategory = () => {
  const { id } = useParams(); // Assuming your route includes category ID
  const navigate = useNavigate();
  const [subCategory, setSubCategory] = useState({
    categoryname: '',
    subcategoryname: '',
    status: 'Inactive',
    sequence: '',
    imagefile: null
  });


  const fetchCategory = async () => {
    try {
      const response = await fetch(`http://localhost:3001/sub-categories/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch category');
      }
      const data = await response.json();
      setSubCategory({
        categoryname: data.category.categoryname,
        subcategoryname: data.category.subcategoryname,
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
    setSubCategory(prevCategory => ({
      ...prevCategory,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setSubCategory(prevCategory => ({
      ...prevCategory,
      imagefile: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('categoryname', subCategory.categoryname);
    formData.append('subcategoryname', subCategory.subcategoryname)
    formData.append('sequence', subCategory.sequence);
    formData.append('status', subCategory.status);
    if (subCategory.imagefile) {
      formData.append('imagefile', subCategory.imagefile);
    }

    try {
      const response = await fetch(`http://localhost:3001/edit-sub-category/${id}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }
      const data = await response.json()
      toast.success(data.msg)
      navigate('/subcategory');
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

          <h2 className="text-2xl font-bold mb-6 text-center">Edit Sub Category</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-10">
            <div>
              <label className="text-gray-700">Category name</label>
              <select
                name="categoryname"
                value={subCategory.categoryname}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition"
              >
                <option value="Dal" >Dal</option>
                <option value="Tea">Tea</option>
                <option value="Wheat">Wheat</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700">Sub Category Name</label>
              <input
                type="text"
                name="subcategoryname"
                value={subCategory.subcategoryname}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition"
                required
              />
            </div>

            <div>
              <label className="text-gray-700">Status</label>
              <select
                name="status"
                value={subCategory.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700">Sequence Number</label>
              <input
                type="number"
                name="sequence"
                value={subCategory.sequence}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded border-gray-600 outline-none focus:ring transition"
                required
              />
            </div>

            <div className="md:flex items-center gap-4 md:col-span-2">
              <div>
                <h1>Uploaded Image</h1>
                <img
                  src={`http://localhost:3001/uploads/${subCategory.imagefile}`}
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

            <div className="mt-5 flex gap-10 md:absolute md:bottom-20 md:right-10">
              <button
                className="w-[150px] bg-purple-600 text-white py-2 rounded-2xl hover:bg-purple-700 focus:ring ring-purple-600 transition"
                type="submit"
              >
                Edit
              </button>
              <button
                className="w-[150px] bg-gray-100 text-black border-2 border-gray-400 py-2 rounded-2xl hover:bg-purple-700 focus:ring ring-purple-600 transition"
                type="button"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default EditSubCategory;
