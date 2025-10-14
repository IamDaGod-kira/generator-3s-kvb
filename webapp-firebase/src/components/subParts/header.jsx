import React from "react";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("Select option");

  const options = ["Dumdum", "Santragachi", "Ballygunge", "Saltlake"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bground-600 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <h3 className="text-primary-200 text-lg font-semibold tracking-wide">
          Smart Study Schedule Generator
        </h3>

        <div className="flex items-center space-x-3 relative">
          <h4 className="text-secondary-100 text-sm font-medium">
            P.M. Shri Kendriya Vidyalaya
          </h4>
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex justify-between w-40 px-3 py-2 text-sm font-medium text-bground-800 bg-secondary-200 border border-secondary-400 rounded-lg shadow-sm hover:bg-secondary-100 focus:outline-none transition"
            >
              {selected}
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
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelected(option);
                      setOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-primary-100 transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
