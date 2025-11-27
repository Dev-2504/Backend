import React, { useState, useEffect } from "react";

export default function Dashboard() {
    const [isVisible, setIsVisible] = useState(false)

    // Add this useEffect for initial animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 50)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className={`
            max-w-7xl mx-auto w-full rounded-lg bg-white p-6 shadow-sm
            transition-all duration-500 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
            <h1 className="text-2xl font-semibold text-gray-900 transition-opacity duration-500">
                Welcome to the Dashboard
            </h1>
            <p className="mt-2 text-gray-600 transition-opacity duration-500 delay-100">
                Use the buttons at top-right to manage users. The profile avatar opens quick actions.
            </p>
        </div>
    );
}