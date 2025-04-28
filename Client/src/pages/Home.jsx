import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { FaBookOpen, FaPenAlt } from 'react-icons/fa';

const Home = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const phrases = [
    "Share your knowledge with the world",
    "Discover insightful articles",
    "Connect with like-minded people",
    "Grow your expertise"
  ];
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 md:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onAnimationComplete={() => setAnimationComplete(true)}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-emerald-600">404.js Blog</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-4">
            Your platform for sharing and discovering knowledge
          </p>

          <motion.div
            key={currentPhrase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl text-emerald-700 font-medium mb-12 h-12"
          >
            {phrases[currentPhrase]}
          </motion.div>
        </motion.div>

        {animationComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col md:flex-row justify-center gap-6 max-w-md mx-auto"
          >
            <Link
              to="/articles"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-lg transition transform hover:scale-105"
            >
              <FaBookOpen className="text-lg" />
              Browse Articles
            </Link>
            <Link
              to="/articles/create"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-emerald-600 font-medium rounded-lg shadow-lg transition transform hover:scale-105"
            >
              <FaPenAlt className="text-lg" />
              Create Article
            </Link>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-emerald-600 text-3xl mb-3">100+</div>
            <div className="text-gray-700">Articles</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-emerald-600 text-3xl mb-3">50+</div>
            <div className="text-gray-700">Authors</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-emerald-600 text-3xl mb-3">10+</div>
            <div className="text-gray-700">Categories</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-emerald-600 text-3xl mb-3">24/7</div>
            <div className="text-gray-700">Active Community</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;