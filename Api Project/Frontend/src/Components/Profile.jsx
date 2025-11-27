import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Profile() {

  const [record, setRecord] = useState({})
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    fetchData()
    // Add this for initial animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 50)
    return () => clearTimeout(timer)
  },[])

  const fetchData = async () => {
    const token = localStorage.getItem("token")

    await axios.get("http://localhost:1008/profile", {
      headers : {
        Authorization : token
      }
    }).then((res) => {
      console.log(res.data)
      setRecord(res.data.data)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10">
      <div className={`
        w-full max-w-md mx-auto bg-white border border-gray-200 rounded-3xl p-8 shadow-md
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>

        {/* Header */}
        <div className="text-center mb-8 transition-opacity duration-500">
          <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
          <p className="mt-2 text-sm text-gray-500 transition-opacity duration-500 delay-100">
            Your account information is shown below.
          </p>
        </div>

        {/* Profile Fields */}
        <div className="space-y-5">

          {/* Username */}
          <div className="transition-all duration-500 delay-150">
            <label className="text-sm text-gray-600 font-medium mb-1 block">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg width="20" height="20" className="text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="7" r="4" />
                  <path d="M5.5 21a6.5 6.5 0 0113 0" />
                </svg>
              </span>

              <input
                type="text"
                value={record.username}
                readOnly
                className="w-full rounded-full border border-gray-200 bg-gray-100 py-3 pl-12 pr-4 text-sm text-gray-700 pointer-events-none select-none transition-colors duration-300"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="transition-all duration-500 delay-200">
            <label className="text-sm text-gray-600 font-medium mb-1 block">
              Phone
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg width="20" height="20" className="text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013 4.18 2 2 0 015 2h3a2 2 0 012 1.72c.1.8.3 1.58.57 2.34a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.74-1.13a2 2 0 012.11-.45c.76.27 1.54.47 2.34.57A2 2 0 0122 16.92z"/>
                </svg>
              </span>

              <input
                type="text"
                value={record.phone}
                readOnly
                className="w-full rounded-full border border-gray-200 bg-gray-100 py-3 pl-12 pr-4 text-sm text-gray-700 pointer-events-none select-none transition-colors duration-300"
              />
            </div>
          </div>

          {/* Email */}
          <div className="transition-all duration-500 delay-250">
            <label className="text-sm text-gray-600 font-medium mb-1 block">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg width="20" height="20" className="text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M4 4h16v16H4V4z" />
                  <path d="M4 4l8 8 8-8" />
                </svg>
              </span>

              <input
                type="email"
                value={record.email}
                readOnly
                className="w-full rounded-full border border-gray-200 bg-gray-100 py-3 pl-12 pr-4 text-sm text-gray-700 pointer-events-none select-none transition-colors duration-300"
              />
            </div>
          </div>

          {/* Role */}
          <div className="transition-all duration-500 delay-300">
            <label className="text-sm text-gray-600 font-medium mb-1 block">
              Role
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg width="20" height="20" className="text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" />
                  <path d="M20 22a8 8 0 10-16 0" />
                </svg>
              </span>

              <input
                type="text"
                value={record.role}
                readOnly
                className="w-full rounded-full border border-gray-200 bg-gray-100 py-3 pl-12 pr-4 text-sm text-gray-700 pointer-events-none select-none transition-colors duration-300"
              />
            </div>
          </div>

        </div>

        <div className="mt-6 text-center text-xs text-gray-400 transition-opacity duration-500 delay-350">
          Your information is secure and protected.
        </div>

      </div>
    </div>
  );
}