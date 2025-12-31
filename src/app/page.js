"use client";
import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import UniCard from "./components/Card";
import CompareModal from "./components/CompareModal";

export default function Home() {
  const [unis, setUnis] = useState([]);
  const [budget, setBudget] = useState(60000);
  const [userGpa, setUserGpa] = useState(0);
  const [userIelts, setUserIelts] = useState(0);
  const [selectedUnis, setSelectedUnis] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const [searchDegree, setSearchDegree] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch universities with filters
  const fetchUniversities = () => {
    setIsLoading(true);
    let url = `/api/universities?budget=${budget}`;
    if (searchCountry) {
      url += `&country=${searchCountry}`;
    }
    if (searchDegree) {
      url += `&degree=${searchDegree}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUnis(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching universities:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUniversities();
  }, [budget, searchCountry, searchDegree]);

  // Handle search from Hero component
  const handleSearch = (country, degree) => {
    setSearchCountry(country);
    setSearchDegree(degree);
  };

  const toggleCompare = (uni) => {
    if (selectedUnis.find((u) => u.id === uni.id)) {
      setSelectedUnis(selectedUnis.filter((u) => u.id !== uni.id));
    } else if (selectedUnis.length < 3) {
      setSelectedUnis([...selectedUnis, uni]);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Hero onSearch={handleSearch} />
      <div className="max-w-6xl mx-auto p-8" id="results-section">
        {/* Search Results Info */}
        {(searchCountry || searchDegree) && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6">
            <h3 className="font-bold text-blue-800 mb-2">Search Results</h3>
            <div className="flex flex-wrap gap-2">
              {searchCountry && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Country: {searchCountry}
                </span>
              )}
              {searchDegree && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Degree: {searchDegree}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchCountry("");
                  setSearchDegree("");
                }}
                className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-red-200 transition-colors"
              >
                Clear Filters ✕
              </button>
            </div>
            <p className="text-blue-600 text-sm mt-2">
              Found {unis.length} universities matching your criteria
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
          <div>
            <label className="block font-bold mb-2">
              Max Tuition Fee: ${budget}
            </label>
            <input
              type="range"
              min="0"
              max="60000"
              step="1000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full"
            />
          </div>
          <input
            type="number"
            placeholder="Your GPA"
            onChange={(e) => setUserGpa(e.target.value)}
            className="border p-2 rounded h-fit self-end"
          />
          <input
            type="number"
            placeholder="Your IELTS"
            onChange={(e) => setUserIelts(e.target.value)}
            className="border p-2 rounded h-fit self-end"
          />
        </div>

        {selectedUnis.length >= 2 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-10 right-10 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full shadow-2xl z-50 font-bold transition-transform hover:scale-105"
          >
            Compare Now ({selectedUnis.length})
          </button>
        )}

        {/* University Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-lg text-gray-600">
              Searching universities...
            </span>
          </div>
        ) : unis.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏫</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No Universities Found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchCountry || searchDegree
                ? "Try adjusting your search criteria or budget range"
                : "Adjust your budget range to see available universities"}
            </p>
            {(searchCountry || searchDegree) && (
              <button
                onClick={() => {
                  setSearchCountry("");
                  setSearchDegree("");
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Search Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {unis.map((uni) => (
              <UniCard
                key={uni.id}
                uni={uni}
                userGpa={userGpa}
                userIelts={userIelts}
                onCompare={() => toggleCompare(uni)}
                isSelected={selectedUnis.some((u) => u.id === uni.id)}
              />
            ))}
          </div>
        )}
        {isModalOpen && (
          <CompareModal
            selectedUnis={selectedUnis}
            onClose={() => setIsModalOpen(false)}
            onClear={() => setSelectedUnis([])}
          />
        )}
      </div>
    </main>
  );
}
