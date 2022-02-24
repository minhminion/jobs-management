import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, RouteProps, useLocation } from 'react-router-dom'
import { selectIsLogin } from '../../features/auth/authSlice'
import { AdminLayout } from '../Layouts'

export const PrivateRoute = (props: RouteProps) => {
  const isLogin = useSelector(selectIsLogin)
  const location = useLocation()

  if (!isLogin) return <Navigate to="/login" />
  if (location.pathname === '/') return <Navigate to="/admin" />

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
