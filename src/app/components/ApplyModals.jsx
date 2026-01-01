"use client";
import { useState } from "react";

export default function ApplyModal({ uni, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    student_name: "",
    student_email: "",
    student_gpa: "",
    student_ielts: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNextStep = (e) => {
    e.preventDefault();
    // Validate Step 1 fields
    if (!formData.student_name || !formData.student_email) {
      setMessage({ type: "error", text: "Please fill in all personal information fields." });
      return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.student_email)) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }
    setMessage({ type: "", text: "" });
    setCurrentStep(2);
  };

  const handlePrevStep = () => {
    setMessage({ type: "", text: "" });
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate Step 2 fields
    if (!formData.student_gpa || !formData.student_ielts) {
      setMessage({ type: "error", text: "Please fill in all academic information fields." });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ university_id: uni.id, ...formData }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: data.message });
        setTimeout(onClose, 3000);
      } else {
        setMessage({ type: "error", text: data.error });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-110 p-4">
      <div className="bg-white p-8 rounded-2xl max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-2">Apply to {uni.name}</h2>
        
        {/* Progress indicator */}
        <div className="flex items-center mb-6">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            2
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          Step {currentStep} of 2: {currentStep === 1 ? 'Personal Information' : 'Academic Information'}
        </div>

        {message.text && (
          <div
            className={`p-3 rounded-lg mb-4 ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {currentStep === 1 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name *"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              value={formData.student_name}
              onChange={(e) =>
                setFormData({ ...formData, student_name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email Address *"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              value={formData.student_email}
              onChange={(e) =>
                setFormData({ ...formData, student_email: e.target.value })
              }
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Next: Academic Information →
            </button>
          </form>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  placeholder="Your GPA *"
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  value={formData.student_gpa}
                  onChange={(e) =>
                    setFormData({ ...formData, student_gpa: e.target.value })
                  }
                />
                <div className="text-xs text-gray-500 mt-1">Required: {uni.min_gpa}+</div>
              </div>
              <div>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="9"
                  placeholder="IELTS Score *"
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  value={formData.student_ielts}
                  onChange={(e) =>
                    setFormData({ ...formData, student_ielts: e.target.value })
                  }
                />
                <div className="text-xs text-gray-500 mt-1">Required: {uni.min_ielts}+</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePrevStep}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
