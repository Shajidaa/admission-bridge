"use client";
import { useState } from "react";

export default function ApplyModal({ uni, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    student_name: "",
    student_email: "",
    student_gpa: "",
    student_ielts: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async () => {
    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ university_id: uni.id, ...formData }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage({ type: "success", text: data.message });
      setTimeout(onClose, 2000);
    } else {
      setMessage({ type: "error", text: data.error });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[110] p-4">
      <div className="bg-white p-8 rounded-2xl max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-2">Apply to {uni.name}</h2>
        <p className="text-sm text-gray-500 mb-6">Step {step} of 2</p>

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

        {step === 1 ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border p-3 rounded-lg"
              onChange={(e) =>
                setFormData({ ...formData, student_name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border p-3 rounded-lg"
              onChange={(e) =>
                setFormData({ ...formData, student_email: e.target.value })
              }
            />
            <button
              onClick={() => setStep(2)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
            >
              Next Step
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="number"
              step="0.01"
              placeholder="Your GPA"
              className="w-full border p-3 rounded-lg"
              onChange={(e) =>
                setFormData({ ...formData, student_gpa: e.target.value })
              }
            />
            <input
              type="number"
              step="0.1"
              placeholder="IELTS Score"
              className="w-full border p-3 rounded-lg"
              onChange={(e) =>
                setFormData({ ...formData, student_ielts: e.target.value })
              }
            />
            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 bg-gray-200 py-3 rounded-lg"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="w-2/3 bg-green-600 text-white py-3 rounded-lg font-bold"
              >
                Submit Application
              </button>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
