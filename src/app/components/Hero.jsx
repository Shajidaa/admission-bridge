"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Hero({ onSearch }) {
  // State for search criteria
  const [country, setCountry] = useState("");
  const [degree, setDegree] = useState("");

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(country, degree);
      // Smooth scroll to results section after search
      setTimeout(() => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  };

  // Animation variants
  const headlineVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const searchBarVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <div
      className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 h-[80vh] flex flex-col items-center justify-center text-white p-6 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-5xl text-center">
        {/* Animated Headline */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headlineVariants}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
            Find Your Dream University
          </h1>
        </motion.div>

        {/* Animated Subtitle */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
          className="text-xl md:text-2xl text-blue-100 font-light max-w-3xl leading-relaxed"
        >
          Discover world-class universities and unlock your potential with our comprehensive search platform
        </motion.p>

        {/* Animated Search Bar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={searchBarVariants}
          className="flex flex-col md:flex-row items-center gap-4 w-full justify-center bg-white/15 p-6 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl"
        >
          <div className="text-left w-full md:w-auto">
            <label className="block text-sm font-semibold text-blue-100 mb-2">
              Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="p-4 border-0 rounded-xl text-gray-800 w-full md:w-72 focus:outline-none focus:ring-4 focus:ring-blue-400/50 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-white font-medium"
            >
              <option value="">Select Country</option>
              <option value="UK">🇬🇧 United Kingdom</option>
              <option value="USA">🇺🇸 United States</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="Germany">🇩🇪 Germany</option>
              <option value="Australia">🇦🇺 Australia</option>
              <option value="Bangladesh">🇧🇩 Bangladesh</option>
            </select>
          </div>

          <div className="text-left w-full md:w-auto">
            <label className="block text-sm font-semibold text-blue-100 mb-2">
              Degree Level
            </label>
            <select
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="p-4 border-0 rounded-xl text-gray-800 w-full md:w-72 focus:outline-none focus:ring-4 focus:ring-blue-400/50 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-white font-medium"
            >
              <option value="">Select Degree Level</option>
              <option value="Bachelor">🎓 Bachelor&apos;s Degree</option>
              <option value="Master">🎯 Master&apos;s Degree</option>
              <option value="PhD">🔬 PhD / Doctorate</option>
            </select>
          </div>

          <div className="flex flex-col items-center mt-4 md:mt-8">
            <motion.button
              onClick={handleSearchClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-4 rounded-xl font-bold shadow-2xl w-full md:w-auto transition-all duration-300 transform hover:shadow-orange-500/25 border-2 border-orange-400/50"
            >
              🔍 Search Universities
            </motion.button>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-8 mt-8 text-blue-200/80"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <span className="text-sm font-medium">1000+ Universities</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            <span className="text-sm font-medium">50+ Countries</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="text-sm font-medium">Free Consultation</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
