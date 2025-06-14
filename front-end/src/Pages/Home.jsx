import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";

function Home() {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("eng");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
    if (!allowedTypes.includes(selected.type)) {
      setFile(null);
      setFileError("❌ Unsupported type. Upload PNG, JPG, or PDF.");
    } else if (selected.size > 10 * 1024 * 1024) {
      setFile(null);
      setFileError("❌ File too large. Max size is 10 MB.");
    } else {
      setFile(selected);
      setFileError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a supported file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);

    try {
      const response = await fetch(
        "https://text-extractor-tg7m.onrender.com/ocr",
        { method: "POST", body: formData }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");

      navigate("/result", { state: data });
    } catch (err) {
      alert("❌ Extraction failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  text-white flex flex-col items-center p-4">
      <Modal show={loading} />

      <div className="w-full max-w-xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-cyan-400 text-center mb-6">
          Text-Extractor
        </h1>

        {/* How It Works */}
        <div className="bg-white/10 p-4 sm:p-6 rounded-xl mb-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">How It Works</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm sm:text-base">
            <li>Upload an image (PNG, JPG) or PDF (first page).</li>
            <li>Select OCR language: English, Hindi, or Kannada.</li>
            <li>Max file size: <strong>10 MB</strong>.</li>
            <li>Click “Submit” to extract text into JSON.</li>
            <li>Download results or upload another file.</li>
          </ul>
        </div>

        {/* Upload Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 p-4 sm:p-6 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col gap-4 sm:gap-6"
        >
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleFileChange}
            className="file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-md
                       bg-white/20 text-white px-3 py-2 rounded-lg border border-white/30 cursor-pointer"
          />

          {file && !fileError && (
            <p className="text-green-400 text-center text-sm sm:text-base">
              ✅ Selected: {file.name}
            </p>
          )}
          {fileError && (
            <p className="text-red-400 text-center text-sm sm:text-base">
              {fileError}
            </p>
          )}

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white/20 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-white/30 text-sm sm:text-base"
          >
            <option value="eng">English</option>
            <option value="hin">Hindi</option>
            <option value="kan">Kannada</option>
          </select>

          <button
            type="submit"
            disabled={!!fileError}
            className="mt-2 sm:mt-4 bg-gradient-to-r from-blue-600 to-purple-600
                       hover:from-blue-700 hover:to-purple-700 text-white font-semibold
                       py-2 sm:py-3 rounded-xl text-sm sm:text-base
                       transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit for Extraction
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
