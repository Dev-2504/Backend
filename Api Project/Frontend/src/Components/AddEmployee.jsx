import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AddEmployee() {
  const [formData, setFormData] = useState({
    username : "",
    phone : "",
    email : "",
  })
  const [isVisible, setIsVisible] = useState(false)

  // Add this useEffect for initial animation
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token")

    await axios.post("http://localhost:1008/employee-registration", formData, {
      headers : {
        Authorization : token
      }
    }).then((res) => {
      if(res.data.status)
      {
        toast.success(res.data.message)
      }
      else {
        toast.error(res.data.message)
      }
    })

    setFormData({
      username : "",
      email : "",
      phone : ""
    })
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-8">
      <div className={`
        w-full max-w-md mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-sm
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>

        {/* Header */}
        <div className="text-center mb-6 transition-opacity duration-500">
          <h2 className="text-2xl font-bold text-gray-900">Add Employee</h2>
          <p className="mt-1 text-sm text-gray-500 transition-opacity duration-500 delay-100">
            Create a new employee account (no password required).
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <label className="relative block transition-all duration-500 delay-150">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              {/* User Icon */}
              <svg
                width="20"
                height="20"
                className="text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path d="M4 20c0-4 3-7 8-7s8 3 8 7" />
              </svg>
            </div>

            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="User name"
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
            />
          </label>

          {/* Email */}
          <label className="relative block transition-all duration-500 delay-200">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              {/* Email Icon */}
              <svg
                width="20"
                height="20"
                className="text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16v12H4z" />
                <path d="M4 7l8 5 8-5" />
              </svg>
            </div>

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email id"
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
            />
          </label>

          {/* Phone */}
          <label className="relative block transition-all duration-500 delay-250">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              {/* Phone Icon */}
              <svg
                width="20"
                height="20"
                className="text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                viewBox="0 0 24 24"
              >
                <path d="M6 2h4l2 5-3 2c1.5 3 4 5.5 7 7l2-3 5 2v4c0 1-1 2-2 2-10 0-18-8-18-18 0-1 1-2 2-2z" />
              </svg>
            </div>

            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Phone number"
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
            />
          </label>

          {/* Submit */}
          <div className="pt-2 transition-all duration-500 delay-300">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-full px-6 py-3 font-medium text-white bg-[#4f39f6] hover:opacity-90 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
            >
              Add Employee
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-gray-400 transition-opacity duration-500 delay-350">
          Employee will receive instructions to set password later.
        </div>
      </div>
    </div>
  );
}