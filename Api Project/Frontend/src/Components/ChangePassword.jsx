import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ChangePassword() {

  const [formData, setFormData] = useState({});
  const [isVisible, setIsVisible] = useState(false);

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
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:1008/changepassword",
      formData,
      {
        headers: {
          Authorization: token
        }
      }
    )
    .then((res) => {
      if (res.data.status) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    })

    setFormData({
      oldpassword: "",
      newpassword: "",
      confirmpassword: ""
    });
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
          <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
          <p className="mt-1 text-sm text-gray-500 transition-opacity duration-500 delay-100">
            Update your account password securely.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Old Password */}
          <label className="relative block transition-all duration-500 delay-150">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              {/* Lock Icon */}
              <svg width="20" height="20" className="text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>

            <input
              type="password"
              name="oldpassword"
              value={formData.oldpassword}
              onChange={handleChange}
              required
              placeholder="Old Password"
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
            />
          </label>

          {/* New Password */}
          <label className="relative block transition-all duration-500 delay-200">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg width="20" height="20" className="text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>

            <input
              type="password"
              name="newpassword"
              value={formData.newpassword}
              onChange={handleChange}
              required
              placeholder="New Password"
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
            />
          </label>

          {/* Confirm Password */}
          <label className="relative block transition-all duration-500 delay-250">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg width="20" height="20" className="text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.3" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>

            <input
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              required
              placeholder="Confirm Password"
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
            />
          </label>

          {/* Submit */}
          <div className="pt-2 transition-all duration-500 delay-300">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-full px-6 py-3 font-medium text-white bg-[#4f39f6] hover:opacity-90 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
            >
              Change Password
            </button>
          </div>
        </form>

        <div className="mt-4 text-center text-xs text-gray-400 transition-opacity duration-500 delay-350">
          Make sure your new password is strong and memorable.
        </div>
      </div>
    </div>
  );
}