import React from "react";

export function AuthForm({
  tab,
  handleChange,
  handleLogin,
  handleRegister,
  form,
  setTab,
  message,
  handleGoogleLogin
}) {
  return (
    <>
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-l-md text-sm font-semibold ${
            tab === "login" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 rounded-r-md text-sm font-semibold ${
            tab === "register" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("register")}
        >
          Register
        </button>
      </div>

      {tab === "register" ? (
        <div className="space-y-3 flex flex-col">
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="input"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="input"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="input"
          />
          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="input"
          />
          {/* <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span>Active User</span>
          </label> */}
          <button
            onClick={handleRegister}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
          {message && (
            <p className="text-center text-sm text-gray-700">{message}</p>
          )}
        </div>
      ) : (
        <div className="space-y-3 flex flex-col">
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            className="input"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="input"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
          {message && (
            <p className="text-center text-sm text-gray-700">{message}</p>
          )}
        </div>
      )}

      <div className="relative flex items-center justify-center">
        <div className="h-px bg-gray-300 w-full absolute"></div>
        <span className="bg-white px-2 text-sm text-gray-500 z-10">or</span>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition"
      >
        Continue with Google
      </button>
    </>
  );
}
