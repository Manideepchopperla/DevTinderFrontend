import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'
import { Check, X } from 'lucide-react'

const Requests = () => {
    const dispatch = useDispatch()
    const requests = useSelector(store => store.request)
    const [toast, setToast] = useState(false);

    const fetchRequestData = async()=>{
        if(requests) return;
        try{
            const res = await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true})
            dispatch(addRequest(res.data.data))
        }catch(err){
            console.error(err)
        }
    }

    console.log(requests)

    const handleIgnore = async(id) => {
        try{
          await axios.post(BASE_URL+"/request/send/rejected/"+id,{},{withCredentials:true})
  
        }catch(err){
          console.error(err)
        }
      }
  
      const handleInterested = async(id) => {
        try{
          console.log("handling ")
          await axios.post(BASE_URL+"/request/review/accepted/"+id,{},{withCredentials:true})
          setToast(true)
          console.log("interested")
          setTimeout(() => {setToast(false);},3000)
        }catch(err){
          console.error(err)
        }
      }

    useEffect(()=>{
        fetchRequestData()
    },[])  

  return (
    <>
        <div className='flex flex-col items-center justify-center my-10'>
            <div className='font-bold text-2xl '>Requests</div>
            {
            (requests && requests.length===0)?(
              <div className="">
                <img
                  src="https://img.freepik.com/free-vector/boycott-abstract-concept-vector-illustration-political-program-consumer-activism-collective-behavior-cancel-culture-moral-purchasing-solidarity-action-public-protest-abstract-metaphor_335657-1933.jpg?t=st=1743482591~exp=1743486191~hmac=91a16477dc0e0c6d4dae6a9f95d7cf6263a77cae7c2a1438fa326e943d4e7278&w=826"
                  className="w-100 h-100"
                  alt="requests empty"
                />
                <h1 className="">No Requests Available</h1>
              </div>
            ):(<div className='flex  items-center justify-center md:items-left md:justify-left sm:flex-wrap flex-col md:flex-row'>
            {requests && requests.map(request => {
                const {_id} = request
                console.log(_id)
                const {firstName, lastName, age, gender, about, photoUrl} = request.fromUserId
                return(
                    <div key={_id} className="card flex items-center justify-center py-5 lg:px-5 lg:card-side bg-base-300 shadow-sm my-5 mx-5">
                        <figure className='w-40 h-40'>
                            <img
                            src={photoUrl}
                            alt="photo"
                            
                            />
                        </figure>
                        <div className="card-body flex flex-col items-center justify-center mb-0 pb-0">
                            <h2 className="card-title text-primary text-center">{firstName + " " + lastName}</h2>
                            {age && gender && <p>{age + ", "+gender}</p>}
                            <p className='text-center'>{about}</p>
                            <div className="card-actions justify-end">
                            <button
                                className="btn w-10 h-10 rounded-full mx-2 my-0 p-1 flex items-center justify-center  transition-all duration-200 ease-in-out "
                                onClick={()=>handleIgnore(_id)}
                                style={{
                                    backgroundColor: '#FFEBEE', 
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                }}
                                >
                                <X color="red" size={20} />
                                </button>

                                <button
                                className="btn w-10 h-10 rounded-full mx-2 my-0 p-1 flex items-center justify-center transition-all duration-200 ease-in-out"
                                style={{
                                    backgroundColor: '#E8F5E9', 
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
                                }}
                                onClick={()=>handleInterested(_id)}
                                >
                                <Check color="green" size={22} />
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
            )}
        </div>
      

        {toast && (<div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Connection Sent Successfully</span>
                </div>
            </div>
          )}
    </>
  )
}

export default Requests