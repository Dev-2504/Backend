import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify';

export default function Login() {

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
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post("http://localhost:1008/login", formData).then((res) => {
            console.log(res.data)
            if(res.data.status)
            {
                 localStorage.setItem("token", res.data.token);
                 navigate("/admin/dashboard")
                toast.success(res.data.message)
            }
            else {
                toast.error(res.data.message)
            }
        })

        setFormData({
            email : "",
            password : ""
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
                <h1 className="text-gray-900 text-3xl mt-10 font-medium transition-opacity duration-500">Login</h1>
                <p className="text-gray-500 text-sm mt-2 transition-opacity duration-500 delay-100">Please sign in to continue</p>

                {/* Email Field */}
                <div className="flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all duration-500 delay-150">
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

                {/* Password Field */}
                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all duration-500 delay-200">
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

                {/* Forgot Password */}
                <div className="mt-4 text-left text-indigo-500 transition-opacity duration-500 delay-250">
                    <button onClick={() => navigate("/sendotp")} className="text-sm cursor-pointer hover:underline" type="button">Forget password?</button>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] delay-300"
                >
                    Login
                </button>

                {/* Sign Up Link */}
                <p className="text-gray-500 text-sm mt-3 mb-11 transition-opacity duration-500 delay-350">
                    Don't have an account? <button onClick={() => navigate("/registration")} type='button' className="text-indigo-500 hover:underline cursor-pointer">click here</button>
                </p>
            </form>
        </div>
  )
}