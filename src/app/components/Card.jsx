import { useState } from "react";
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaDollarSign,
  FaCheck,
  FaTimes,
  FaArrowRight,
  FaUserGraduate,
  FaBookOpen,
} from "react-icons/fa";
import { IoCheckboxOutline, IoCheckbox } from "react-icons/io5";
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
      className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden ${
        !isEligible && userGpa > 0 ? "opacity-80" : ""
      } ${isSelected ? "ring-2 ring-blue-500" : ""}`}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-gray-900 leading-tight flex-1 pr-3">
            {uni.name}
          </h3>
          <button
            onClick={() => onCompare(uni)}
            className="shrink-0 p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isSelected ? (
              <IoCheckbox className="w-6 h-6 text-blue-500" />
            ) : (
              <IoCheckboxOutline className="w-6 h-6 text-gray-400 hover:text-blue-500" />
            )}
          </button>
        </div>

        {/* Location and Degree */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="w-4 h-4" />
            <span>{uni.country}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaGraduationCap className="w-4 h-4" />
            <span>{uni.degree_level}</span>
          </div>
        </div>

        {/* Tuition Fee */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2">
            <FaDollarSign className="w-5 h-5 text-green-700" />
            <div>
              <p className="text-sm text-green-600 font-medium">Tuition Fee</p>
              <p className="text-xl font-bold text-green-700">
                {uni.tuition_fee?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <FaUserGraduate className="w-5 h-5 text-gray-600 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Min GPA</p>
            <p className="font-bold text-gray-700">{uni.min_gpa}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <FaBookOpen className="w-5 h-5 text-gray-600 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Min IELTS</p>
            <p className="font-bold text-gray-700">{uni.min_ielts}</p>
          </div>
        </div>

        {/* Eligibility Status */}
        {userGpa > 0 && (
          <div
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg mb-4 ${
              isEligible
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {isEligible ? (
              <FaCheck className="w-4 h-4" />
            ) : (
              <FaTimes className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {isEligible ? "Eligible" : "Not Eligible"}
            </span>
          </div>
        )}

        {/* Apply Button */}
        <button
          onClick={() => setIsApplyOpen(true)}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
            isEligible || userGpa === 0
              ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md hover:shadow-lg"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-200"
          }`}
        >
          <span>
            {isEligible || userGpa === 0 ? "Apply Now" : "Cannot Apply"}
          </span>
          <FaArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
          Selected
        </div>
      )}

      {/* Apply Modal */}
      {isApplyOpen && (
        <ApplyModal uni={uni} onClose={() => setIsApplyOpen(false)} />
      )}
    </div>
  );
}
