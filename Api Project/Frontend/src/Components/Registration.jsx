import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Registration() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({})
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
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post("http://localhost:1008/registration", formData).then((res) => {
      if (res.data.status) {
        toast.success(res.data.message)
        navigate("/login")
      }
      else {
        toast.error(res.data.message)
      }
    })

    setFormData({
      username: "",
      email: "",
      phone: "",
      password: "",
    })
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className={`
          sm:w-[350px] w-full max-w-[350px] text-center border border-gray-300/60 rounded-2xl px-8 bg-white
          transition-all duration-500 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >

        <h1 className="text-gray-900 text-3xl mt-10 font-medium transition-opacity duration-500">Register</h1>
        <p className="text-gray-500 text-sm mt-2 transition-opacity duration-500 delay-100">Create your account to continue</p>

        {/* Name Input */}
        <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all duration-500 delay-150">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 0 0-16 0" />
          </svg>
          <input
            name='username'
            type="text"
            onChange={handleChange}
            value={formData.username}
            placeholder="User name"
            className="border-none outline-none ring-0 w-full bg-transparent"
            autoComplete="off"
            required
          />
        </div>

        {/* Email Input */}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all duration-500 delay-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
          </svg>
          <input
            name='email'
            type="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email id"
            className="border-none outline-none ring-0 w-full bg-transparent"
            autoComplete="off"
            required
          />
        </div>

        {/* Phone Input — Added */}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all duration-500 delay-250">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2.07 2.07 0 0 1-2.24 2 19.79 19.79 0 0 1-8.63-3.06 19.37 19.37 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.24 2.07 2.07 0 0 1 4.06 2h3A2.07 2.07 0 0 1 9.13 3.72a13.14 13.14 0 0 0 .7 2.91 2.1 2.1 0 0 1-.45 2.18l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2.1 2.1 0 0 1 2.18-.45 13.14 13.14 0 0 0 2.91.7A2.07 2.07 0 0 1 22 16.92z" />
          </svg>
          <input
            name='phone'
            type="tel"
            onChange={handleChange}
            value={formData.phone}
            placeholder="Phone number"
            className="border-none outline-none ring-0 w-full bg-transparent"
            autoComplete="off"
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all duration-500 delay-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            name='password'
            type="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Password"
            className="border-none outline-none ring-0 w-full bg-transparent"
            autoComplete="off"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] delay-350"
        >
          Sign up
        </button>

        <p className="text-gray-500 text-sm mt-3 mb-11 transition-opacity duration-500 delay-400">
          Already have an account? <button type='button' onClick={() => navigate("/login")} className="text-indigo-500 hover:underline cursor-pointer">click here</button>
        </p>
      </form>
    </div>
  )
}