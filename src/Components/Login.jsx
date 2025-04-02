import { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../utils/userSlice';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPass] = useState('');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user  = useSelector(store => store.user)

  if (user) {
    navigate(user.isNewUser ? '/profile' : '/');
    return null;
  }
 
  const handleLogin = async()=>{
    try{
    const res = await axios.post(BASE_URL+"/login",{
      emailId,
      password
    },
    {
      withCredentials:true
    });
    dispatch(setUser({ ...res.data, isNewUser: false }))
    return navigate('/')
    }catch(error){
      setError(error?.response?.data || "something went wrong");
    }
  }

  const handleSignUp = async()=>{
    try{
    const res = await axios.post(BASE_URL+"/signup",{
      firstName,
      lastName,
      emailId,
      password
    },
    {
      withCredentials:true
    });
    dispatch(setUser({ ...res.data, isNewUser: true }))
    navigate('/profile')
    }catch(error){
      setError(error?.response?.data || "something went wrong");
    }
  }


  return (
    <div className='flex items-center justify-center my-10'>
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>

          {!isLoginForm && <>
            <label className="fieldset-legend">First Name </label>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
              <input type="input" required placeholder="First Name" value={firstName} onChange={(e)=> setFirstName(e.target.value)} />
            </label>

            <label className="fieldset-legend">Last Name </label>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
              <input type="input" required placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
            </label>
          </>}


            <label className="fieldset-legend">Email ID</label>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
              <input type="email" value={emailId} placeholder="mail@site.com" onChange={(e) => setEmailId(e.target.value)} required/>
            </label>

            <label className="fieldset-legend">Password</label>
            <label className="input validator ">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
              <input type="password" required placeholder="Password" value={password} minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                onChange={(e)=>setPass(e.target.value)}
              />
            </label> 
            <p className='text-red-300'>{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary my-5 mx-4 mb-0" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
          </div>
          <p
            className="m-auto cursor-pointer py-2 text-primary"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login