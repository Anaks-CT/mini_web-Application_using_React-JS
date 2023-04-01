import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className='conainer-fluid d-flex justify-content-center align-items-center mt-5'>
      <Link to='/'><span className='mx-4' style={{fontSize : 21}}>Home</span></Link>
      <Link to='/profile'><span className='mx-4' style={{fontSize : 21}}>Profile</span></Link>
    </div>
  )
}

export default NavBar