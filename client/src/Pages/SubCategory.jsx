import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import { toast } from 'react-toastify';
import { BiSearch } from 'react-icons/bi';
import useAuth from '../utils/useAuth';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [searchCategory, setSearchCategory] = useState('')


  const hanldeChange = (e) => {
    const { value } = e.target
    setSearchCategory(value)

  }
  const filetredCategory = categories.filter(cat => cat.categoryname.toLowerCase().includes(searchCategory.toLowerCase()))


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/sub-categories');
      if (!response.ok) {
        toast.error('Failed to fetch categories');
      }
      const data = await response.json();
      const sortedCategories = data.categories.sort((a, b) => a.sequence - b.sequence);

      setCategories(sortedCategories);
    } catch (error) {
      toast.error('Error fetching categories:', error.message);
    }
  };

  const deleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this sub category?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/delete-sub-category/${categoryId}?confirm=true`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      const data = await response.json()
      toast.success(data.msg)
      setCategories(categories.filter(cat => cat.id !== categoryId));
    } catch (error) {
      toast.error('Error deleting category.', error.message);
    }
  };

  useAuth()




  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      {categories.length ? <div className="flex-1 p-4 ">
        <div className='space-y-4 md:flex md:justify-around md:items-center md:mb-5 md:space-x-6'>
          <h1 className="text-2xl font-bold ">Sub Category</h1>

          <div className='relative w-full max-w-md md:mx-auto'>
            <input type="text" className='border-2 outline-none rounded-md border-gray-300 p-1 pl-10 w-full sm:pl-12' value={searchCategory} onChange={hanldeChange} />
            <BiSearch className='absolute w-5 h-5 top-1.5 left-3 sm:top-2 sm:left-4' color='gray' />
          </div>

          <button className=" bg-purple-600 text-white py-2 px-4 rounded">
            <Link to='/add-sub-category'>Add Sub Category</Link>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className='bg-yellow-200'>
              <tr>
                <th className=" p-2">ID</th>
                <th className=" p-2">Sub Category Name</th>
                <th className=" p-2">Category Name</th>
                <th className=" p-2">Image</th>
                <th className=" p-2">Status</th>
                <th className=" p-2">Sequence</th>
                <th className=" p-2">Action</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {filetredCategory.map(category => (
                <tr key={category.id} className='border-t-8 border-b-4 border-gray-200 bg-gray-300'>
                  <td className=" p-2">{category.id}</td>
                  <td className=" p-2">{category.subcategoryname}</td>

                  <td className=" p-2">{category.categoryname}</td>
                  <td className=" p-2">
                    <img src={`http://localhost:3001/uploads/${category.imagefile}`} alt={category.categoryname} className='w-16 h-10 object-cover mx-auto' />
                  </td>
                  <td className={` p-2 ${category.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                    {category.status}
                  </td>
                  <td className=" p-2">{category.sequence}</td>
                  <td className=" p-2 flex justify-center">
                    <Link to={`/edit-sub-category/${category.id}`} className="w-fit bg-blue-500 text-white py-1 px-2 rounded mr-2 flex items-center">
                      <FaEdit className="mr-1" /> Edit
                    </Link>
                    <button className="bg-red-500 text-white py-1 px-2 rounded flex items-center" onClick={() => deleteCategory(category.id)}>
                      <FaTrash className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> : <div className='flex justify-center items-center mx-auto text-2xl text-purple-400 font-semibold'>No Sub Categories Available. <Link to='/add-sub-category' className='bg-purple-500 px-5 py-1 rounded-2xl text-white font-normal'>Add</Link></div>}
    </div>
  );
};

export default Category;
