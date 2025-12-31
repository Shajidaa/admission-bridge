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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-110 p-4">
      <div className="bg-white p-8 rounded-2xl max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-2">Apply to {uni.name}</h2>

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

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg"
            required
            onChange={(e) =>
              setFormData({ ...formData, student_name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-3 rounded-lg"
            required
            onChange={(e) =>
              setFormData({ ...formData, student_email: e.target.value })
            }
          />

          <div className="space-y-4">
            <input
              type="number"
              placeholder="Your GPA"
              required
              className="w-full border p-3 rounded-lg"
              onChange={(e) =>
                setFormData({ ...formData, student_gpa: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="IELTS Score"
              className="w-full border p-3 rounded-lg"
              required
              onChange={(e) =>
                setFormData({ ...formData, student_ielts: e.target.value })
              }
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="w-2/3 bg-green-600 text-white py-3 rounded-lg font-bold"
              >
                Submit Application
              </button>
            </div>
          </div>
        </form>

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
