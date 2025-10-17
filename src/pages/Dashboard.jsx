import React from 'react'
import ClientList from '../components/ClientList'

const Dashboard = () => {
  return (
    <div className='container mx-auto p-6'>
        <h1 className='text-3xl font-bold mb-6'>Client Management System</h1>
        <ClientList />
    </div>
  )
}

export default Dashboard