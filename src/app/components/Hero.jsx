"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Hero({ onSearch }) {
  const [country, setCountry] = useState("");
  const [degree, setDegree] = useState("");

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(country, degree);

      setTimeout(() => {
        const resultsSection = document.getElementById("results-section");
        if (resultsSection) {
          resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  };

  // Animation
  const headlineVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const searchBarVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 min-h-screen sm:h-[90vh] md:h-[85vh] lg:h-[80vh] flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-32 h-32 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[600px] sm:h-[600px] bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 w-full max-w-7xl text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headlineVariants}
          className="space-y-2 sm:space-y-4 px-2"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
            The Admission Bridge
          </h1>
        </motion.div>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 font-light max-w-xs sm:max-w-2xl lg:max-w-4xl leading-relaxed px-4"
        >
          Discover world-class universities and unlock your potential with our
          comprehensive search platform
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={searchBarVariants}
          className="flex flex-col lg:flex-row items-stretch lg:items-end gap-3 sm:gap-4 w-full max-w-6xl justify-center bg-white/15 p-4 sm:p-6 rounded-2xl sm:rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl mx-2"
        >
          <div className="text-left w-full lg:w-auto flex-1 lg:flex-none">
            <label className="block text-xs sm:text-sm font-semibold text-blue-100 mb-2">
              Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="p-3 sm:p-4 border-0 rounded-lg sm:rounded-xl text-gray-800 w-full lg:w-64 xl:w-72 focus:outline-none focus:ring-4 focus:ring-blue-400/50 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-white font-medium text-sm sm:text-base"
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

          {/* Degree Select - Responsive */}
          <div className="text-left w-full lg:w-auto flex-1 lg:flex-none">
            <label className="block text-xs sm:text-sm font-semibold text-blue-100 mb-2">
              Degree Level
            </label>
            <select
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              className="p-3 sm:p-4 border-0 rounded-lg sm:rounded-xl text-gray-800 w-full lg:w-64 xl:w-72 focus:outline-none focus:ring-4 focus:ring-blue-400/50 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-white font-medium text-sm sm:text-base"
            >
              <option value="">Select Degree Level</option>
              <option value="Bachelor">🎓 Bachelor&apos;s Degree</option>
              <option value="Master">🎯 Master&apos;s Degree</option>
            </select>
          </div>

          {/* Search Button  */}
          <div className="flex flex-col items-center w-full lg:w-auto mt-2 lg:mt-8">
            <motion.button
              onClick={handleSearchClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold shadow-2xl w-full lg:w-auto transition-all duration-300 transform hover:shadow-orange-500/25 border-2 border-orange-400/50 text-sm sm:text-base"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-lg sm:text-xl">🔍</span>
                <span className="hidden sm:inline">Search Universities</span>
                <span className="sm:hidden">Search</span>
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Trust indicators - Responsive layout and text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-8 text-blue-200/80 px-4"
        >
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-lg sm:text-2xl">🏆</span>
            <span className="text-xs sm:text-sm font-medium">
              1000+ Universities
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-lg sm:text-2xl">🌍</span>
            <span className="text-xs sm:text-sm font-medium">
              50+ Countries
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-lg sm:text-2xl">✨</span>
            <span className="text-xs sm:text-sm font-medium">
              Free Consultation
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
