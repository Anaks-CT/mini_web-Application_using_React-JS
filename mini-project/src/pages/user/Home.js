import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button';
import NavBar from '../../components/NavBar'
import { logout } from '../../store/slices/users';


function Home() {
  const user = useSelector(state => state.currentUser)
  const dispatch = useDispatch()

  /////////////////////////////////// loging out the user ///////////////////
  
  const handleLogout = (e) =>{
    e.preventDefault()
    dispatch(logout())
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userProfileUrl");
    
  }
  return (
    <div>
      <NavBar />
      <div className='container d-flex flex-column justify-content-center align-items-center mt-5'>
        <div className="col-10  p-5 shadow border"><h1 className='text-center'>Welcome {user.name}</h1></div>
        <div><form onSubmit={handleLogout}><Button danger>LOGOUT</Button></form></div>
      </div>
    </div>
  )
}

export default Home