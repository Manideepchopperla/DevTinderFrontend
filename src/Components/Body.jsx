import { useDispatch, useSelector } from 'react-redux'
import Footer from './Footer'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { setUser } from '../utils/userSlice'
import { useEffect } from 'react'


const Body = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector(store => store.user)

  const fetchUser = async() => {
    if(userData) return;
    try{
    const res = await axios.get(BASE_URL+"/profile/view",{withCredentials:true})
    dispatch(setUser(res.data))
    }catch(error){
      if(error.status===401){
        navigate("/login")
    }
      console.error(error)
    }
  }

  useEffect(()=>{
      fetchUser()
  },[])


  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body