import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Registration from './Components/Registration'
import SendOtp from './Components/SendOtp'
import VerifyOtp from './Components/VerifyOtp'
import ResetPassword from './Components/ResetPassword'

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from './Components/Dashboard'
import ProtectedRoute from './Components/ProtectedRoute'
import AdminLayout from './Components/AdminLayout'
import AddEmployee from './Components/AddEmployee'
import AddManager from './Components/AddManager'
import ViewManager from './Components/ViewManager'
import ViewEmployee from './Components/ViewEmployee'
import ViewEmployeeManager from './Components/ViewEmployeeManager'
import ChangePassword from './Components/ChangePassword'
import Profile from './Components/Profile'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/sendotp" element={<SendOtp />} />
          <Route path="/verifyotp" element={<VerifyOtp />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          <Route path='/admin' element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path='dashboard' element={<Dashboard />}></Route>
            <Route path='addmanager' element={<AddManager />}></Route>
            <Route path='viewmanager' element={<ViewManager />}></Route>
            <Route path='addemployee' element={<AddEmployee />}></Route>
            <Route path='viewemployee' element={<ViewEmployee />}></Route>
            <Route path='viewemployeemanager' element={<ViewEmployeeManager />}></Route>
            <Route path='changepassword' element={<ChangePassword />}></Route>
            <Route path='profile' element={<Profile />}></Route>
          </Route>
          
        </Routes>
      </BrowserRouter>

      {/* Toast Container globally */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}
