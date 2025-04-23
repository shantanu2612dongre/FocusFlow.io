import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signing up with:', name, email, password);
    
    // Redirect to login page after successful signup
    navigate('/');
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-black via-[#020617] to-black flex items-center justify-center px-4">
      <div className="bg-[#1f2937] shadow-2xl rounded-2xl w-full max-w-6xl h-auto md:h-[80%] flex flex-col md:flex-row overflow-hidden">
        {/* Left Section - Lure Text */}
        <div className="md:w-1/2 w-full bg-gradient-to-b from-black via-[#020617] to-black text-white p-8 md:p-10 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate__animated animate__fadeIn">Why FocusFlow?</h2>
          <p className="text-xl md:text-2xl mb-6 animate__animated animate__fadeIn animate__delay-1s">
            Focus on what matters and unlock your full potential.
          </p>
          <ul className="space-y-2 text-lg md:text-xl animate__animated animate__fadeIn animate__delay-2s">
            <li>⚡ Boost your productivity with focus tracking</li>
            <li>🧠 Break free from distractions</li>
            <li>⏱️ Track and optimize your work sessions</li>
            <li>🌱 Build healthy work habits</li>
          </ul>
        </div>

        {/* Right Section - Sign up Form */}
        <div className="md:w-1/2 w-full p-8 md:p-10 flex flex-col justify-center relative">
          {/* Transparent Background div */}
          <div className="absolute inset-0 bg-blue opacity-60 rounded-2xl"></div>
          
          {/* Form and content */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 relative z-10">Create an Account</h2>

          <form onSubmit={handleSignup} className="flex flex-col gap-6 relative z-10">
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 border border-gray-700 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-700 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border border-gray-700 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm mt-6 text-gray-400 text-center relative z-10">
            Already have an account?{" "}
            <a href="/" className="text-purple-600 font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;