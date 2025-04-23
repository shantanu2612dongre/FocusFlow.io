import React, { useState } from 'react';
import supabase  from './supabaseClient'; 
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Logging in with:', email, password);

    // Email login logic (for email/password-based login)
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Error logging in:', error.message);
    } else {
      console.log('Logged in user:', user);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    if (error) {
      console.error(`Error logging in with ${provider}:`, error.message);
    } else {
      console.log(`Logged in via ${provider}:`, user);
    }
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

        {/* Right Section - Login Form */}
        <div className="md:w-1/2 w-full p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Welcome Back 👋</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-all duration-300"
            >
              Login
            </button>
          </form>

          {/* Social Login */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleOAuthLogin('google')}
              className="flex items-center justify-center gap-3 bg-white border border-gray-300 py-2 rounded-xl hover:shadow transition-all"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
            <button
              onClick={() => handleOAuthLogin('facebook')}
              className="flex items-center justify-center gap-3 bg-white border border-gray-300 py-2 rounded-xl hover:shadow transition-all"
            >
              <img src="https://www.svgrepo.com/show/452196/facebook-1.svg" alt="Facebook" className="w-5 h-5" />
              <span>Continue with Facebook</span>
            </button>
          </div>

          <p className="text-sm mt-6 text-gray-500 text-center">
            New here?{" "}
            <a href="/signup" className="text-purple-600 font-semibold">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;