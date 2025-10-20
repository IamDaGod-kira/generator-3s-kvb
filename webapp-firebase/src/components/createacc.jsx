import React, { useState } from "react";

export default function Createacc() {
  const [selectedClass, setSelectedClass] = useState("");
  const showCourse = ["11", "12"].includes(selectedClass);

  const redirectLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-inherit font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.2)] w-[420px] max-w-full">
        <h2 className="text-center mb-6 text-sky-400 text-[22px] font-bold tracking-wide">
          Student Enrollment Form
        </h2>
        <hr />
        <button
          onClick={redirectLogin}
          className="w-full py-3 mt-5 bg-gradient-to-r from-[#2575fc] to-[#6a11cb] text-white font-bold text-base rounded-lg shadow-md hover:opacity-90 hover:-translate-y-0.5 hover:text-yellow-400 transition"
        >
          Already have account? Login here
        </button>
        <br />
        <br />
        <hr />
        <form>
          <label
            htmlFor="fullname"
            className="font-bold block mt-3 text-gray-700 text-sm"
          >
            Full Name of Student
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Enter full name of student"
            required
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition"
          />

          <label
            htmlFor="fathername"
            className="font-bold block mt-3 text-gray-700 text-sm"
          >
            Name of Father
          </label>
          <input
            type="text"
            id="fathername"
            name="fathername"
            placeholder="Enter name of father"
            required
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition"
          />

          <label
            htmlFor="mothername"
            className="font-bold block mt-3 text-gray-700 text-sm"
          >
            Name of Mother
          </label>
          <input
            type="text"
            id="mothername"
            name="mothername"
            placeholder="Enter name of mother"
            required
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition"
          />

          <label
            htmlFor="email"
            className="font-bold block mt-3 text-gray-700 text-sm"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            required
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition"
          />

          <label
            htmlFor="uniqueid"
            className="font-bold block mt-3 text-gray-700 text-sm"
          >
            Unique ID
          </label>
          <input
            type="text"
            id="uniqueid"
            name="uniqueid"
            placeholder="Enter Unique ID"
            required
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition"
          />

          <label
            htmlFor="phone"
            className="font-bold block mt-3 text-gray-700 text-sm"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            required
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition"
          />

          <label
            htmlFor="altphone"
            className="font-bold block mt-3 text-gray-700 text-sm"
          >
            Alternative Phone Number
          </label>
          <input
            type="tel"
            id="altphone"
            name="altphone"
            placeholder="Enter your alternative phone number"
            required
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition"
          />

          <label className="font-bold block mt-3 text-gray-700 text-sm">
            Gender
          </label>
          <div className="mt-1">
            <label className="mr-4 text-sm text-gray-600">
              <input type="radio" name="gender" value="male" required /> Male
            </label>
            <label className="mr-4 text-sm text-gray-600">
              <input type="radio" name="gender" value="female" /> Female
            </label>
            <label className="text-sm text-gray-600">
              <input type="radio" name="gender" value="other" /> Other
            </label>
          </div>

          <label className="font-bold block mt-3 text-gray-700 text-sm">
            Physically Disabled
          </label>
          <div className="mt-1">
            <label className="mr-4 text-sm text-gray-600">
              <input type="radio" name="handicapped" value="yes" required /> Yes
            </label>
            <label className="text-sm text-gray-600">
              <input type="radio" name="handicapped" value="no" /> No
            </label>
          </div>

          <label
            htmlFor="class"
            className="font-bold block mt-3 text-gray-700 text-sm"
          >
            Select Class
          </label>
          <select
            id="class"
            name="class"
            required
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition"
          >
            <option value="">-- Choose Class --</option>
            <option value="b1">Balvatika I</option>
            <option value="b2">Balvatika II</option>
            <option value="b3">Balvatika III</option>
            {[...Array(12).keys()].map((n) => (
              <option key={n + 1} value={n + 1}>
                Class {n + 1}
              </option>
            ))}
          </select>

          {showCourse && (
            <>
              <label
                htmlFor="course"
                className="font-bold block mt-3 text-gray-700 text-sm"
              >
                Select Course
              </label>
              <select
                id="course"
                name="course"
                className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition"
              >
                <option value="">-- Choose a Stream --</option>
                <option value="science-cs">Science (Computer Science)</option>
                <option value="science-bio">Science (Biology)</option>
                <option value="commerce">Commerce</option>
                <option value="arts">Humanities</option>
              </select>
            </>
          )}

          <label
            htmlFor="address"
            className="font-bold block mt-3 text-gray-700 text-sm"
          >
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows="4"
            placeholder="Enter address"
            required
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none resize-none transition"
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 mt-5 bg-gradient-to-r from-[#2575fc] to-[#6a11cb] text-white font-bold text-base rounded-lg shadow-md hover:opacity-90 hover:-translate-y-0.5 hover:text-yellow-400 transition"
          >
            Enroll Now
          </button>
        </form>
      </div>
    </div>
  );
}
