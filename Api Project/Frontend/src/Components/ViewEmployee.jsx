import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ViewEmployee() {
  const [record, setRecord] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      fetchData()
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 50)
      return () => clearTimeout(timer)
    },[])
  
    const fetchData = async () => {
      setLoading(true)
      const token = localStorage.getItem("token")
  
      await axios.get("http://localhost:1008/employ-show-admin", {
        headers : {
          Authorization : token
        }
      }).then((res) => {
        console.log(res.data)
        setRecord(res.data.data)
      }).finally(() => {
        setLoading(false)
      })
    }

    const handleDelete = async (id) => {
      const token = localStorage.getItem("token")

      await axios.patch("http://localhost:1008/employee-delete",{id : id}, {
        headers : {
          Authorization : token
        }
      }).then((res) => {
        console.log(res.data)
        // Delete thaya pachhi data ferthi load karo
        fetchData()
      })
    }

  return (
    <div className="w-full px-4 py-6">
      <div className={`
        max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}>

        {/* Header */}
        <div className="mb-5 transition-opacity duration-500">
          <h1 className="text-2xl font-bold text-gray-900">Employee List</h1>
          <p className="text-sm text-gray-500 mt-1 transition-opacity duration-500 delay-100">
            All employees with their basic account details.
          </p>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-12 transition-opacity duration-300">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {/* Table - Only show when not loading */}
        {!loading && (
          <div className="overflow-x-auto transition-opacity duration-500 delay-150">
            {record.length === 0 ? (
              // Empty state
              <div className="text-center py-12 transition-opacity duration-500">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
                <p className="text-sm text-gray-500">No employee accounts have been created yet.</p>
              </div>
            ) : (
              // Table with data
              <table className="w-full border-collapse rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 text-left text-gray-600 text-sm border-b border-gray-200">
                    <th className="py-3 px-4 font-medium transition-all duration-300 delay-200">Username</th>
                    <th className="py-3 px-4 font-medium transition-all duration-300 delay-250">Phone</th>
                    <th className="py-3 px-4 font-medium transition-all duration-300 delay-300">Email</th>
                    <th className="py-3 px-4 font-medium text-center transition-all duration-300 delay-350">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {record.map((emp, index) => (
                    <tr
                      key={emp.id}
                      className={`
                        border-b border-gray-100 hover:bg-gray-50 transition-all duration-300
                        transition-opacity duration-500
                      `}
                      style={{
                        animationDelay: `${200 + (index * 50)}ms`
                      }}
                    >
                      <td className="py-3 px-4 text-gray-800 transition-colors duration-300">{emp.username}</td>
                      <td className="py-3 px-4 text-gray-700 transition-colors duration-300">{emp.phone}</td>
                      <td className="py-3 px-4 text-gray-700 transition-colors duration-300">{emp.email}</td>

                      {/* Delete Button */}
                      <td className="py-3 px-4 text-center">
                        <button 
                          onClick={() => handleDelete(emp._id)}
                          className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-all duration-300 cursor-pointer transform hover:scale-105"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}