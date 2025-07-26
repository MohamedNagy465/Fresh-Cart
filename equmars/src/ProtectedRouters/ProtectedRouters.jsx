import React, { children, useContext } from 'react'
import { authContext } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouters({children}) {
let {token} = useContext(authContext)
  return (
    <div>
        {token? children : <Navigate to={"/login"} /> }
    </div>
  )
}
