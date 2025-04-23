
import React from 'react'
import { Outlet } from 'react-router'

export default function Products() {
  return (
    <div className='py-6 px-6'>
        <Outlet />
    </div>
  )
}
