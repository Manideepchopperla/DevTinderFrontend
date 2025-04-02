
import axios from 'axios';
import { Check, X } from 'lucide-react';
import { BASE_URL } from '../utils/constants';
//import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user,button}) => {
    const {_id,firstName, lastName, photoUrl,about,age,gender} = user;
    // const [toast, setToast] = useState(false);
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
      try {
        await axios.post(
          BASE_URL + "/request/send/" + status + "/" + userId,
          {},
          { withCredentials: true }
        );
        dispatch(removeUserFromFeed(userId));
      } catch (err) {
        console.error(err);
      }
    };

    // const handleIgnore = async() => {
    //   try{
    //     await axios.post(BASE_URL+"/request/send/ignore/"+_id,{},{withCredentials:true})
    //     dispatch(removeUserFromFeed(_id));

    //   }catch(err){
    //     console.error(err)
    //   }
    // }

    // const handleInterested = async() => {
    //   try{
    //     console.log("handling ")
    //     await axios.post(BASE_URL+"/request/send/interested/"+_id,{},{withCredentials:true})
    //     dispatch(removeUserFromFeed(_id));
    //     setToast(true)
    //     console.log("interested")
    //     setTimeout(() => {setToast(false);},3000)
    //   }catch(err){
    //     console.error(err)
    //   }
    // }

  return (
    <>
    <div className="card bg-base-300 w-96 shadow-sm">
        <figure className=''>
          <img
            src={photoUrl}
            alt="user"
         />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName+" "+lastName}</h2>
          {age && gender && <p>{"Age : "+age + " , Gender :  " + gender} </p>}
          <p>{about}</p>
          <div className="card-actions justify-center ">
          <button
            className="btn w-[40%] mx-3 my-4 p-4 flex items-center justify-center  transition-all duration-200 ease-in-out "
            disabled={button}
            onClick={()=>handleSendRequest("ignore", _id)}
            style={{
                backgroundColor: '#FFEBEE', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Adds a shadow effect
            }}
            >
            <X color="red" size={30} />
            {/* <span className="text-sm font-semibold text-red-600">Ignore</span> */}
            </button>

            <button
            className="btn w-[40%] mx-3 my-4 p-4 flex items-center justify-center transition-all duration-200 ease-in-out"
            disabled={button}
            style={{
                backgroundColor: '#E8F5E9', // Light green background
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Adds a shadow effect
            }}
            onClick={()=>handleSendRequest("interested", _id)}
            >
            <Check color="green" size={32} />
            {/* <span className="text-sm font-semibold text-green-600">Interested</span> */}
            </button>
          </div>
        </div>
    </div>
    {/* {toast && (<div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Connection Sent Successfully</span>
                </div>
            </div>
          )} */}
    </>
  )
}

export default UserCard