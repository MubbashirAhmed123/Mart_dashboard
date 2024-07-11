import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from './Pages/Login'
import Category from './Pages/Category'
import EditCategory from './Pages/EditCategory'
import AddCategory from './Pages/AddCategory'
import Dashboard from './Pages/Dashboard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import SubCategory from './Pages/SubCategory'
import AddSubCategory from './Pages/AddSubCategory'
import EditSubCategory from './Pages/EditSubCategory'
import Navbar from './Components/Navbar'
import Products from './Pages/Products'
import AddProduct from './Pages/AddProduct'
import EditProduct from './Pages/EditProduct'
import ForgotPassword from './Pages/ForgetPassword'
import ResetPassword from './Pages/ResetPassword'
import NotFoundPage from './Pages/NotFoundPage'
function App() {
  const {pathname}=useLocation()
  return (
    <div>
    <ToastContainer/>
    {pathname =='/' || pathname=='/forget-password' ?'':<Navbar/>}
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/add-category' element={<AddCategory/>}/>
        <Route path='/edit-category/:id' element={<EditCategory/>}/>
        <Route path='/subcategory' element={<SubCategory/>}/>
        <Route path='/add-sub-category' element={<AddSubCategory/>}/>
        <Route path='/edit-sub-category/:id' element={<EditSubCategory/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/add-product' element={<AddProduct/>}/>
        <Route path='/edit-product/:id' element={<EditProduct/>}/>
        <Route path='/forget-password' element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
        <Route path='*' element={<NotFoundPage/>}/>


      </Routes>
    </div>
  )
}

export default App