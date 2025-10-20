import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-700">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>

      {/* Loading Text */}
      <h2 className="text-2xl font-semibold tracking-wide animate-pulse">
        Loading your schedule...
      </h2>

      {/* Small hint line */}
      <p className="mt-2 text-sm text-gray-500">Please wait a moment ⏳</p>
    </div>
  );
}
