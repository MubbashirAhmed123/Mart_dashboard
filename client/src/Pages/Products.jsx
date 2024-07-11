import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar'
import { toast } from 'react-toastify';
import { BiSearch } from 'react-icons/bi';
import useAuth from '../utils/useAuth';

const Products = () => {
  const [products, setProducts] = useState([]);
  const[searchCategory,setSearchCategory]=useState('')


  const hanldeChange=(e)=>{
    const{value}=e.target
    setSearchCategory(value)
      

  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/products');
      if (!response.ok) {
        toast.error('Failed to fetch products.');
      }
      const data = await response.json();
      const sortedProducts = data.products.sort((a, b) => a.sequence - b.sequence);

      setProducts(sortedProducts);
    } catch (error) {
      toast.error('Error fetching products.', error.message);
    }
  };

  const deleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this products?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/delete-product/${categoryId}?confirm=true`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to delete product.');
      }

      const data=await response.json()
      toast.success(data.msg)
      setProducts(products.filter(cat => cat.id !== categoryId));
    } catch (error) {
      toast.error('Error deleting products.', error.message);
    }
  };

  const filetredCategory=products.filter(cat=>cat.productname.toLowerCase().includes(searchCategory.toLowerCase()))

  useAuth()



  return (
<div className="flex flex-col md:flex-row">
  <Sidebar/>
 {products.length ? <div className="flex-1 p-4 ">
    
  <div className='space-y-4 md:flex md:justify-between md:items-center md:mb-5 md:space-x-6'>
  <h1 className="text-2xl font-bold ">Products</h1>

  <div className='relative w-full max-w-md md:mx-auto'>
  <input type="text" className='border-2 outline-none rounded-md border-gray-300 p-1 pl-10 w-full sm:pl-12' value={searchCategory} onChange={hanldeChange} />
  <BiSearch className='absolute w-5 h-5 top-1.5 left-3 sm:top-2 sm:left-4' color='gray'/>
</div>

  <button className=" bg-purple-600 text-white py-2 px-4 rounded">
      <Link to='/add-product'>Add Product</Link>
    </button>
  </div>

    <div className="overflow-x-auto">
    <table className="w-full border-collapse ">
  <thead className='bg-yellow-200'>
    <tr> 
      <th className=" p-2">ID</th>
      <th className=" p-2">Products Name</th>
      <th className=" p-2">Sub Category Name</th>
      <th className=" p-2">Categoty</th>
      <th className=" p-2">Image</th>
      <th className=" p-2">Status</th>
      <th className=" p-2">Sequence</th>
      <th className=" p-2">Action</th>
    </tr>
  </thead>
  <tbody className='text-center'>  
    {filetredCategory.map(product => (
      <tr key={product.id} className='border-t-8 border-b-4 border-gray-200 bg-gray-300 '>
        <td className=" p-2">{product.id}</td>
        <td className=" p-2 ">{product.productname}</td>
        <td className=" p-2 ">{product.subcategoryname}</td>
        <td className=" p-2 ">{product.category}</td>

        <td className=" p-2">
          <img src={`http://localhost:3001/uploads/${product.imagefile}`} alt={product.categoryname} className='h-10 w-16 object-cover mx-auto' />
        </td>
        <td className={` p-2 ${product.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
          {product.status}
        </td>
        <td className=" p-2">{product.sequence}</td>
        <td className=" p-2 flex justify-center">
          <Link to={`/edit-product/${product.id}`} className="w-fit bg-blue-500 text-white py-1 px-2 rounded mr-2 flex items-center">
            <FaEdit className="mr-1" /> Edit
          </Link>
          <button className="bg-red-500 text-white py-1 px-2 rounded flex items-center" onClick={() => deleteCategory(product.id)}>
            <FaTrash className="mr-1" /> Delete
          </button>
        </td>
        <hr />
      </tr>
    ))}
  </tbody>
</table>

    </div>
  </div>:<div className='flex justify-center items-center mx-auto text-2xl text-purple-400 font-semibold'>No Products Available. <Link to='/add-product' className='bg-purple-500 px-5 py-1 rounded-2xl text-white font-normal'>Add</Link></div>}
</div>
  );
};

export default Products;
