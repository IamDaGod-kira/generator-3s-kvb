import React, { useState, useEffect } from "react";

export default function Header() {
  const options = ["Dumdum", "Santragachi", "Ballygunge", "Saltlake"];
  const [selected, setSelected] = useState(null);
  const [current, setCurrent] = useState(options[0]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (selected) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        const nextIndex = (index + 1) % options.length;
        setIndex(nextIndex);
        setCurrent(options[nextIndex]);
        setFade(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, [index, selected]);

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#9D4A4B] text-[gold] shadow-md font-['Libertinus_Serif_Display']">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/KVS_SVG_logo.svg/1100px-KVS_SVG_logo.svg.png"
              alt="KVS Logo"
              className="h-14"
            />
          </div>

          {/* School Name + Dropdown */}
          <div className="flex-1 flex justify-center items-center">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Kendriya Vidyalaya
              <div className="relative inline-block">
                <button
                  onClick={() => setOpen(!open)}
                  className={`inline-flex items-center justify-between px-3 py-1 rounded-md font-semibold transition ${
                    selected
                      ? "bg-[#f8f4f4] text-[#9D4A4B]"
                      : "bg-[#f8f4f4]/70 text-[#9D4A4B]/70 italic"
                  }`}
                >
                  <span
                    className={`transition-opacity duration-500 ${
                      fade ? "opacity-100" : "opacity-30"
                    }`}
                  >
                    {selected || current}
                  </span>
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {open && (
                  <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                    {options.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelected(option);
                          setCurrent(option);
                          setOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#f5f5f5] transition"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </h1>
          </div>

          {/* Call & Logout */}
          <div className="flex items-center gap-3">
            <a
              href="call.html"
              className="bg-green-400 text-green-700 px-4 py-2 rounded-full font-bold transition hover:bg-white hover:shadow-md"
            >
              Call Us
            </a>
            <a
              href="login.html"
              className="bg-white text-blue-500 px-4 py-2 rounded-full font-bold transition hover:bg-[rgb(139,226,255)] hover:text-[rgb(0,81,255)] hover:shadow-md"
            >
              Logout
            </a>
          </div>
        </div>
      </header>

      {/* Navigation below header */}
      <div className="pt-28 flex justify-center">
        <nav className="flex justify-center gap-5 p-4 max-w-2xl bg-white rounded-lg shadow-md">
          <a
            href="/login"
            className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-white hover:text-green-600 transition-colors duration-300"
          >
           Login
          </a>
          <a
            href="student_list.html"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300"
          >
            Student List
          </a>
          <a
            href="/"
            className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-white hover:text-gray-800 transition-colors duration-300"
          >
            Home
          </a>
        </nav>
      </div>
    </>
  );
}
