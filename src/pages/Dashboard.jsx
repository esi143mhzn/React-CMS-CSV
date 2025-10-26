import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ClientList from '../components/ClientList'
import DuplicateClients from '../components/DuplicateClient'

const Dashboard = () => {
  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Client Management System</h1>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/clients" replace />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/duplicate-clients" element={<DuplicateClients />} />
        </Routes>
      </Router>
    </div>
  )
}

export default Dashboard