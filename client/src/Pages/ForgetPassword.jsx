import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.msg);
      } else {
        toast.error(data.msg || 'Error sending password reset link');
      }
    } catch (error) {
      toast.error('Error sending password reset link');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-[">
        <h2 className="text-xl font-bold mb-6 text-center">Did you forgot password?</h2>
        <p className='text-gray-600 text-center mb-5'>Enter your email address to send and we'll send you a link to reset password</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded border-black outline-none focus:border-0 focus:ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 focus:ring focus:ring-purple-600 transition">
            Send Reset Link
          </button>
        </form>
       <h1 className='text-center mt-2 underline text-gray-700 text-sm'> <Link to='/'>Back to Log in</Link></h1>
      </div>
    </div>
  );
};

export default ForgotPassword;
