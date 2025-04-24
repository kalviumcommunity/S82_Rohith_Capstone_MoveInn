import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaBusAlt } from 'react-icons/fa';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form); // Make sure login() is imported from your auth service
      localStorage.setItem('token', res.token);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 font-sans">
      <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-2xl border border-white border-opacity-20 p-10 rounded-3xl w-full max-w-md animate-fadeIn text-white">
        
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center mb-8 tracking-wide flex items-center justify-center gap-3">
          <FaBusAlt className="text-white" />
          Welcome to MoveInn
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Input */}
          <div className="flex items-center bg-gray-200 rounded-md px-4 py-3">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-transparent w-full text-gray-700 placeholder-gray-500 focus:outline-none"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center bg-gray-200 rounded-md px-4 py-3">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="bg-transparent w-full text-gray-700 placeholder-gray-500 focus:outline-none"
              required
            />
          </div>

          {/* Error message */}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white bg-opacity-30 hover:bg-opacity-40 transition duration-300 text-white font-bold py-3 text-lg rounded-lg shadow-md"
          >
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <div className="mt-6 flex justify-between text-sm text-white text-opacity-80">
          <a href="/forgot-password" className="hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Sign-up */}
        <div className="mt-6 text-center text-white text-opacity-90 text-sm">
          Don’t have an account?{' '}
          <a href="/signup" className="text-white underline hover:text-blue-200">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
