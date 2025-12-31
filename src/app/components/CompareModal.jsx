"use client";

export default function CompareModal({ selectedUnis, onClose, onClear }) {
  if (selectedUnis.length === 0) return null;
  console.log("selectedUnis", selectedUnis);

  return (
    <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              University Comparison
            </h2>
            <p className="text-sm text-gray-500">
              Comparing {selectedUnis.length} institutions
            </p>
          </div>
          <div className="flex items-center gap-4">
            {/* Added Clear All Button */}
            <button
              onClick={() => {
                onClear();
                onClose();
              }}
              className="text-sm text-red-600 hover:text-red-800 font-medium underline"
            >
              Clear Selection
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 transition-colors text-3xl font-light"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b text-gray-400 font-medium uppercase text-xs">
                  Criteria
                </th>
                {selectedUnis.map((u) => (
                  <th
                    key={u.id}
                    className="p-4 border-b font-bold text-blue-600 text-center uppercase tracking-wider"
                  >
                    {u.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="hover:bg-gray-50">
                <td className="p-4 border-b font-semibold bg-gray-50/50">
                  GPA Requirement
                </td>
                {selectedUnis.map((u) => (
                  <td key={u.id} className="p-4 border-b text-center">
                    {u.min_gpa || "N/A"}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-4 border-b font-semibold bg-gray-50/50">
                  IELTS Requirement
                </td>
                {selectedUnis.map((u) => (
                  <td key={u.id} className="p-4 border-b text-center">
                    {u.min_ielts || "N/A"}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-4 border-b font-semibold bg-gray-50/50">
                  Total Tuition
                </td>
                {selectedUnis.map((u) => (
                  <td
                    key={u.id}
                    className="p-4 border-b text-center font-bold text-green-600"
                  >
                    {u.tuition_fee
                      ? `$${Number(u.tuition_fee).toLocaleString()}`
                      : "Contact for Fees"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
