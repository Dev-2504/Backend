import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function SendOtp() {

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

        await axios.post("http://localhost:1008/sendotp", formData).then((res) => {
            console.log(res.data)
            localStorage.setItem("email", res.data.data);
            if (res.data.status) {
                toast.success(res.data.message)
                navigate("/verifyotp")
            }
            else {
                toast.error(res.data.message)
            }
        })

        setFormData({
            email: ""
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

                <h1 className="text-gray-900 text-3xl mt-10 font-medium transition-opacity duration-500">Forgot Password</h1>
                <p className="text-gray-500 text-sm mt-2 transition-opacity duration-500 delay-100">Enter your registered email to receive OTP</p>

                {/* Email Field (Same as Login) */}
                <div className="flex items-center w-full mt-6 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all duration-500 delay-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                    </svg>

                    <input
                        type="email"
                        placeholder="Email address"
                        name='email'
                        onChange={handleChange}
                        value={formData.email}
                        required
                        className="border-none outline-none ring-0 w-full bg-transparent"
                        autoComplete="off"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                >
                    Send OTP
                </button>
                <p className="text-gray-500 text-sm mt-3 mb-11 transition-opacity duration-500 delay-300">
                    Remember password? <button onClick={() => navigate("/login")} type='button' className="text-indigo-500 hover:underline cursor-pointer">Go back to login</button>
                </p>
            </form>
        </div>
    )
}