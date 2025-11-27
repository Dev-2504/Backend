import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ResetPassword() {

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

    const obj = {
      ...formData,
      email: localStorage.getItem("email")
    }

    await axios.post("http://localhost:1008/resetpassword", obj).then((res) => {
      if (res.data.status) {
        toast.success(res.data.message)
        navigate("/login")
      }
      else {
        toast.error(res.data.message)
      }
    })

    setFormData({
      newpassword: "",
      confirmpassword: ""
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
        <h1 className="text-gray-900 text-3xl mt-10 font-medium transition-opacity duration-500">Reset Password</h1>
        <p className="text-gray-500 text-sm mt-2 transition-opacity duration-500 delay-100">Enter your new password below</p>

        {/* New Password */}
        <div className="flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all duration-500 delay-150">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            name='newpassword'
            type="password"
            onChange={handleChange}
            value={formData.newpassword}
            placeholder="New Password"
            className="border-none outline-none ring-0 w-full bg-transparent"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all duration-500 delay-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            name='confirmpassword'
            type="password"
            onChange={handleChange}
            value={formData.confirmpassword}
            placeholder="Confirm Password"
            className="border-none outline-none ring-0 w-full bg-transparent"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] delay-300"
        >
          Reset Password
        </button>

        <p className="text-gray-500 text-sm mt-3 mb-11 transition-opacity duration-500 delay-400">
          Remembered your password? <button 
            type="button" 
            onClick={() => navigate("/login")} 
            className="text-indigo-500 hover:underline cursor-pointer"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  )
}