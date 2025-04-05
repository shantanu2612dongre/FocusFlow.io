import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient"; // Adjust path if needed

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("Signup failed: " + error.message);
    } else {
      console.log("Signed up!", data);
      alert("Signup successful! Please check your email for verification.");
      window.location.href = "/login";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-futuristic-black/80">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-futuristic-purple">Create Account</h2>
        <p className="text-center text-futuristic-text-secondary mb-6">Sign up to FocusFlow</p>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-600 dark:text-gray-300">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-futuristic-purple bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-futuristic-purple bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-2 mt-4 bg-futuristic-purple text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Already have an account? 
          <Link to="/login" className="text-futuristic-purple hover:underline ml-1">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}