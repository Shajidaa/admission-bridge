import { useState } from "react";
import ApplyModal from "./ApplyModals";

export default function UniCard({
  uni,
  userGpa,
  userIelts,
  onCompare,
  isSelected,
}) {
  const isEligible = userGpa >= uni.min_gpa && userIelts >= uni.min_ielts;
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  return (
    <div
      className={`border p-5 rounded-xl shadow-md bg-white ${
        !isEligible && userGpa > 0 ? "opacity-75" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold">{uni.name}</h3>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onCompare(uni)}
          className="w-5 h-5"
        />
      </div>
      <p className="text-gray-600">
        {uni.country} • {uni.degree_level}
      </p>
      <div className="mt-4">
        <p className="font-bold text-blue-600">Fee: ${uni.tuition_fee}</p>
        <p className="text-sm text-gray-500">
          Min GPA: {uni.min_gpa} | IELTS: {uni.min_ielts}
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        {!isEligible && userGpa > 0 ? (
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
            Not Eligible
          </span>
        ) : (
          <button
            onClick={() => setIsApplyOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm w-full"
          >
            Apply Now
          </button>
        )}
      </div>
      {isApplyOpen && (
        <ApplyModal uni={uni} onClose={() => setIsApplyOpen(false)} />
      )}
    </div>
  );
}
