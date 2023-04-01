import React from 'react'
import SigninForm from '../../components/SigninForm'

function AdminSignin() {
  
  return (
    <div className='container d-flex flex-column justify-content-center align-items-center mt-5 pt-5'>
      <SigninForm use='admin'/>
    </div>
  )
}

export default AdminSignin