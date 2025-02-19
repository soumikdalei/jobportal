import React, { useContext, useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Application from './pages/application'
import ApplyJob from './pages/ApplyJob'
import RecruiterLogin from './components/RecruiterLogin'
import { use } from 'react'
import { Appcontext } from './context/Appcontext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import Managejobs from './pages/Managejobs'
import ViewApplications from './pages/ViewApplications'
import "quill/dist/quill.snow.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const{showRecruiterLogin}=useContext(Appcontext)

  return (
    <div>
    {showRecruiterLogin && <RecruiterLogin/>}
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/application" element={<Application />} />
        <Route path="/dashboard" element={<Dashboard />} >
        <Route path="add-job" element={<AddJob/>}/>
        <Route path="manage-job" element={<Managejobs/>}/>
        <Route path="view-applications" element={<ViewApplications/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
