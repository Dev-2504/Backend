import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function VerifyOtp() {

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

    await axios.post("http://localhost:1008/verifyotp", obj).then((res) => {
      if (res.data.status) {
        toast.success(res.data.message)
        navigate("/resetpassword")
      }
      else {
        toast.error(res.data.message)
      }
    })

    setFormData({
      otp: ""
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
        {/* Heading */}
        <h1 className="text-gray-900 text-3xl mt-10 font-medium transition-opacity duration-500">Enter OTP</h1>
        <p className="text-gray-500 text-sm mt-2 transition-opacity duration-500 delay-100">
          Please enter the verification code sent to your registered email address
        </p>

        {/* Input Field */}
        <div className="flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all duration-500 delay-150">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l3 3" />
          </svg>
          <input
            name="otp"
            type="number"
            onChange={handleChange}
            value={formData.otp}
            placeholder="Enter 6-digit OTP"
            required
            className="border-none outline-none ring-0 w-full bg-transparent
  [&::-webkit-inner-spin-button]:appearance-none
  [&::-webkit-outer-spin-button]:appearance-none
  [appearance:textfield]"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] delay-300"
        >
          Verify OTP
        </button>

        {/* Resend */}
        <p className="text-gray-500 text-sm mt-3 mb-11 transition-opacity duration-500 delay-400">
          Didn't receive the code?{" "}
          <button 
            type="button" 
            onClick={() => navigate("/sendotp")} 
            className="text-indigo-500 hover:underline cursor-pointer"
          >
            Resend OTP
          </button>
        </p>
      </form>
    </div>
  )
}