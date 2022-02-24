import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { NotFound, PrivateRoute } from './components/common'
import AuthPage from './features/auth/pages/AuthPage'
import JobsPage from './features/jobs/pages/JobsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />} />
      <Route path="/admin" element={<PrivateRoute />}>
        <Route index element={<JobsPage />} />
      </Route>
      <Route path="/login" element={<AuthPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
