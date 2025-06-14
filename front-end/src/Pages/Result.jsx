import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const resultData = location.state;

  if (!resultData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl sm:text-3xl text-red-400 mb-6">No data found.</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(resultData, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "extracted_text.json");
  };

  return (
    <div className="min-h-screen  text-white flex flex-col items-center p-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400 mb-6 text-center">
        OCR Result
      </h1>

      <div className="bg-white/10 border border-white/20 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg w-full max-w-3xl overflow-y-auto max-h-[60vh] space-y-3">
        {resultData.raw_text
          .split("\n")
          .filter((line) => line.trim() !== "")
          .map((line, idx) => (
            <p key={idx} className="text-sm sm:text-base leading-relaxed text-white/90">
              {line}
            </p>
          ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <button
          onClick={handleDownload}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-medium transition"
        >
          Download JSON
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-medium transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Result;
