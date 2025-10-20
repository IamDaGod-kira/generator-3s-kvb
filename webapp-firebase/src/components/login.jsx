import { lazy } from "react";

export default function Login() {
  return (
    <main className="min-h-screen bg-inherit bg-center bg-no-repeat bg-cover text-center font-sans">
      <section className="max-w-3xl mx-auto mt-8 mb-10 bg-white p-8 rounded-2xl shadow-lg">
        <form className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Login for PM Shri Kendriya Vidyalaya Ballygunge
          </h1>

          <div>
            <h2 className="text-xl text-blue-900 mb-2 font-semibold">
              <label htmlFor="email">Enter Email ID</label>
            </h2>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email ID"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h2 className="text-xl text-blue-900 mb-2 font-semibold">
              <label htmlFor="username">Enter Username</label>
            </h2>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h2 className="text-xl text-blue-900 mb-2 font-semibold">
              <label htmlFor="password">Enter Password</label>
            </h2>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password Required"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h2 className="text-xl text-blue-900 mb-2 font-semibold">
              <label htmlFor="unique-id">Enter Unique ID</label>
            </h2>
            <input
              type="text"
              id="unique-id"
              name="unique-id"
              placeholder="Unique ID"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Login to go to school website
          </button>
        </form>
        <br />
        <br />
        <hr />
        <br />
        <a
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300"
          href="/createacc"
        >
          Create new Account
        </a>
      </section>
    </main>
  );
}
