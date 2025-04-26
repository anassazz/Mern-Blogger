import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const Home = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const phrases = [
    "Share your knowledge",
    "Discover new ideas",
    "Connect with community"
  ];
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      
      
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onAnimationComplete={() => setAnimationComplete(true)}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-indigo-600">404.js Blog</span>
          </h1>
          
          <motion.div
            key={currentPhrase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl text-gray-600 mb-12 h-12"
          >
            {phrases[currentPhrase]}
          </motion.div>
        </motion.div>

        {animationComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col md:flex-row justify-center gap-6"
          >
            <Link
              to="/articles"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Browse Articles
            </Link>
            <Link
              to="/articles/create"
              className="px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 font-medium rounded-lg shadow-lg transition transform hover:scale-105"
            >
              Create Article
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;