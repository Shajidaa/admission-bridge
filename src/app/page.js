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
  useEffect(() => {
    fetch(`/api/universities?budget=${budget}`)
      .then((res) => res.json())
      .then((data) => setUnis(data));
  }, [budget]);

  const toggleCompare = (uni) => {
    if (selectedUnis.find((u) => u.id === uni.id)) {
      setSelectedUnis(selectedUnis.filter((u) => u.id !== uni.id));
    } else if (selectedUnis.length < 3) {
      setSelectedUnis([...selectedUnis, uni]);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />
      <div className="max-w-6xl mx-auto p-8">
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
