import SignUp from "./pages/user/SignUp";
import {Navigate, BrowserRouter,Route,Routes} from 'react-router-dom'
import SignIn from "./pages/user/SignIn";
import AdminSignin from "./pages/admin/AdminSignin";
import Home from './pages/user/Home'
import Profile from './pages/user/Profile'
import AdminHome from "./pages/admin/AdminHome";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addNewUser, addProfileImage } from "./store/slices/users";


function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.currentUser)

  /////////////////////////////// getting the details from localstorage ////////////////////

  useEffect(() => {
    const alreadyLoggedInUser = localStorage.getItem("currentUser");
    const currentUserProfileUrl = localStorage.getItem('userProfileUrl')
    if (alreadyLoggedInUser) {
      dispatch(
        addNewUser(JSON.parse(alreadyLoggedInUser))
      );
    }
    if(currentUserProfileUrl){
      dispatch(addProfileImage(JSON.parse(currentUserProfileUrl)))
    }
  }, []);

  
  return <BrowserRouter>
  <Routes>
    <Route path='/signup' element={!user ? <SignUp /> : <Navigate to='/' />} />
    <Route path='/signin' element={!user ? <SignIn /> : <Navigate to='/' />} />
    <Route path="/adminsignin" element={<AdminSignin />}/>
    <Route path="/" element={user ? <Home /> : <Navigate to='/signin' />} />
    <Route path="/profile" element={user ? <Profile /> : <Navigate to='/signin' />} />
    <Route path="/dashboard" element={<AdminHome />} />
  </Routes>
</BrowserRouter>
  
}

export default App;
