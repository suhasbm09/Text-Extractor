import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const resultData = location.state;

  if (!resultData) {
    return (
      <div className="text-white flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-red-400 text-xl mb-4">No data found.</h2>
        <button
          className="bg-blue-600 px-4 py-2 rounded-lg text-white"
          onClick={() => navigate("/")}
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
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-cyan-400 mb-6">OCR Result</h1>

      <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-lg max-w-3xl w-full space-y-3 text-base leading-relaxed overflow-y-auto max-h-[60vh]">
        {resultData.raw_text
          .split("\n")
          .filter((line) => line.trim() !== "")
          .map((line, idx) => (
            <p key={idx} className="text-white/90">
              {line}
            </p>
          ))}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-medium transition-all duration-200"
        >
          Download JSON
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-medium transition-all duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Result;
