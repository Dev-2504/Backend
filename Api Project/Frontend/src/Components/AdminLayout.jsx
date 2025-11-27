import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
    const [profileOpen, setProfileOpen] = useState(false);
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const profileRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    // Close dropdown when clicking outside or pressing ESC
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                setProfileOpen(false);
            }
        };

        if (profileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [profileOpen]);

    const fetchData = async () => {
        const token = localStorage.getItem("token");

        await axios
            .get("http://localhost:1008/profile", {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                setUser({ ...res.data.data });
            })
            .catch((err) => console.log(err));
    };

    const Logout = () => {
        localStorage.removeItem("token");
        navigate("/login")
    }

    const toggleProfile = () => {
        setProfileOpen((val) => !val);
    };

    return (
        <div className="w-full h-screen flex flex-col">
            {/* Fixed Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left: Logo / Title */}
                        <div className="flex items-center space-x-3" onClick={() => navigate("/admin/dashboard")}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold">
                                    M
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-gray-800">MyApp</div>
                                    <div className="text-xs text-gray-500">Admin Dashboard</div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Buttons + Profile */}
                        <div className="flex items-center gap-3">
                            {/* ROLE-BASED BUTTONS */}
                            <div className="hidden sm:flex items-center gap-2">
                                {/* ADMIN ⇒ ALL BUTTONS */}
                                {user?.role === "Admin" && (
                                    <>
                                        <button onClick={() => navigate("/admin/addmanager")} className="px-3 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">
                                            <span className="flex items-center gap-2">
                                                <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4' />
                                                </svg>
                                                Add Manager
                                            </span>
                                        </button>

                                        <button onClick={() => navigate("/admin/viewmanager")} className="px-3 py-2 text-sm font-medium rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition">
                                            <span className="flex items-center gap-2">
                                                <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M2 20c0-4 4-7 10-7s10 3 10 7' />
                                                </svg>
                                                View Manager
                                            </span>
                                        </button>

                                        <button onClick={() => navigate("/admin/viewemployee")} className="px-3 py-2 text-sm font-medium rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition">
                                            <span className="flex items-center gap-2">
                                                <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M2 20c0-4 4-7 10-7s10 3 10 7' />
                                                </svg>
                                                View Employee
                                            </span>
                                        </button>
                                    </>
                                )}

                                {/* MANAGER ⇒ EMPLOYEE BUTTONS ONLY */}
                                {user?.role === "Manager" && (
                                    <>
                                        <button onClick={() => navigate("/admin/addemployee")} className="px-3 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">
                                            <span className="flex items-center gap-2">
                                                <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 4v16m8-8H4' />
                                                </svg>
                                                Add Employee
                                            </span>
                                        </button>

                                        <button onClick={() => navigate("/admin/viewemployeemanager")} className="px-3 py-2 text-sm font-medium rounded-md border border-gray-200 bg-white hover:bg-gray-50 transition">
                                            <span className="flex items-center gap-2">
                                                <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M2 20c0-4 4-7 10-7s10 3 10 7' />
                                                </svg>
                                                View Employee
                                            </span>
                                        </button>
                                    </>
                                )}

                                {/* EMPLOYEE ⇒ NO BUTTONS */}
                                {user?.role === "Employee" && null}
                            </div>

                            {/* Profile Dropdown */}
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={toggleProfile}
                                    className="flex items-center gap-3 px-3 py-2 rounded-full hover:bg-gray-100"
                                >
                                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                                        {user?.username?.slice(0, 2).toUpperCase() || "PF"}
                                    </div>

                                    <div className="text-left">
                                        <div className="text-sm font-medium text-gray-800">
                                            {user?.username || "UserName"}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {user?.role || "Role"}
                                        </div>
                                    </div>
                                </button>

                                {profileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                                        <button 
                                            onClick={() => {
                                                navigate("/admin/profile");
                                                setProfileOpen(false);
                                            }} 
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                                        >
                                            Profile
                                        </button>
                                        <button 
                                            onClick={() => {
                                                navigate("/admin/changepassword");
                                                setProfileOpen(false);
                                            }} 
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                                        >
                                            Change Password
                                        </button>
                                        <div className="border-t my-1" />
                                        <button onClick={() => Logout()} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Scrollable Content */}
            <main className="max-w-7xl mx-auto p-6">
                <Outlet />
            </main>
        </div>
    );
}