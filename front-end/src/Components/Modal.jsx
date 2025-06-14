import React from "react";

const Modal = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-8 shadow-xl text-center flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin mb-4"></div>
        <h2 className="text-white text-xl font-semibold">Extracting text...</h2>
        <p className="text-gray-300 text-sm">Please wait a moment</p>
      </div>
    </div>
  );
};

export default Modal;
