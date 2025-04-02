import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { removeUser } from '../utils/userSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((store)=>store.user)
  const navigate = useNavigate();

  const handleLogout = async() => {
    try{
      await axios.post(BASE_URL+"/logout",{},{
        withCredentials: true
      })
      dispatch(removeUser())
      return navigate("/login")
    }catch(err){
      console.error(err)
    }
  }

  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/"><div className="btn btn-ghost bg-base-100 text-xl">DevTinder</div></Link>
        </div>
        <div className="flex gap-2">
          {user && 
          
          
          <div className="dropdown dropdown-end mx-10">
            <button className="btn bg-base-100">
            Welcome <span className='text-primary'>{user.firstName} </span>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full m-1">
                <img
                  alt="user photo"
                  src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow mt-[100%]">
              <li >
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link> 
              </li>
              <li >
                <Link to="/connections" className="justify-between">
                  Connections
                </Link> 
              </li>
              <li >
                <Link to="/requests" className="justify-between">
                  Requests
                </Link> 
              </li>
              <li><Link to="/settings">Settings</Link></li>
              <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
            </button>
          </div>
        }
        </div>
      </div>
    </div>
  )
}

export default Navbar