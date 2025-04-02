import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connections = () => {

    const dispatch = useDispatch()
    const connections = useSelector(store => store.connection)

    const fetchConnectionsData = async() => {
        try{
            const res = await axios.get(BASE_URL+"/user/connections",{withCredentials:true})
            dispatch(addConnection(res?.data?.data))
        }catch(err){
            console.error(err)
        }

    }

    useEffect(()=>{
        fetchConnectionsData()
    },[])

  return (
    <div className='flex flex-col items-center justify-center my-10'>
        <div className='font-bold text-2xl '>Connections</div>
        <div className='flex  items-center justify-center md:items-left md:justify-left sm:flex-wrap flex-col md:flex-row'>
        {connections.map(connection => {
            const {_id,firstName, lastName, age, gender, about, photoUrl} = connection
            return(
                <div key={_id} className="card flex items-center justify-center py-5 lg:px-5 lg:card-side bg-base-300 shadow-sm my-5 mx-5">
                    <figure className='w-40 h-40'>
                        <img
                        src={photoUrl}
                        alt="photo"
                        
                         />
                    </figure>
                    <div className="card-body flex flex-col items-center justify-center">
                        <h2 className="card-title text-primary text-center">{firstName + " " + lastName}</h2>
                        {age && gender && <p>{age + ", "+gender}</p>}
                        <p>{about}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary w-50">Chat</button>
                        </div>
                    </div>
                </div>
            )
        })}
        </div>
    </div>
  )
}

export default Connections