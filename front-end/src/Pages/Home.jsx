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
      setFileError("❌ Unsupported file type. Please upload PNG, JPG, or PDF.");
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
      const response = await fetch("http://localhost:5000/ocr", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      navigate("/result", { state: data });

    } catch (error) {
      alert("❌ Extraction failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Modal show={loading} />
      <div className="bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4 text-center animate-pulse">
          Text-Extractor
        </h1>
        <p className="text-sm text-gray-300 mb-4 text-center">Upload a JPG, PNG, or PDF file</p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .pdf"
            onChange={handleFileChange}
            className="file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-md file:border-none file:cursor-pointer 
                       bg-white/10 text-white px-3 py-2 rounded-md border border-white/20"
          />

          {file && !fileError && (
            <p className="text-green-400 text-sm text-center">✅ Selected: {file.name}</p>
          )}

          {fileError && (
            <p className="text-red-400 text-sm text-center">{fileError}</p>
          )}

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white/10 text-white px-3 py-2 rounded-md border border-white/20"
          >
            <option value="eng">English</option>
            <option value="hin">Hindi</option>
            <option value="kan">Kannada</option>
          </select>
          <button
            type="submit"
            disabled={!!fileError}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                       text-white font-semibold py-2 rounded-xl transition-all duration-300 disabled:opacity-50"
          >
            Submit for Extraction
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
