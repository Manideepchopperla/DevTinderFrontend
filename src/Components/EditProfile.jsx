import { useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { setUser } from '../utils/userSlice'

const EditProfile = ({user}) => {
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [age,setAge] = useState(user.age)
    const [gender,setGender] = useState(user.gender || "Male")
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)
    const [about,setAbout] = useState(user.about)   
    const [error,setError] = useState('')
    const [toast, setToast] = useState(false)

    const saveProfile = async() => {
        try{
            const res = await axios.patch(BASE_URL + '/profile/edit', {firstName,lastName,age,gender,photoUrl,about},{withCredentials:true})
            dispatch(setUser(res?.data?.data))
            setError('')
            setToast(true)
            setTimeout(() => setToast(false), 3000);

        }catch(error){
            setError(error?.response?.data)
            setToast(true)
            setTimeout(() => setToast(false), 3000);
        }
    }

    return (
        <>
            <div className="flex justify-center my-10">
                <div className="flex justify-center mx-10">
                <div className="card bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>
                    <div>
                        <label className="form-control w-full max-w-xs my-2">
                        <div className="label">
                            <span className="label-text my-1">First Name:</span>
                        </div>
                        <input
                            type="text"
                            value={firstName}
                            className="input input-bordered w-full my-1 max-w-xs"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                            <span className="label-text my-1">Last Name:</span>
                            </div>
                            <input
                            type="text"
                            value={lastName}
                            className=" my-1 input input-bordered w-full max-w-xs"
                            onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>
                        <div className="label">
                            <span className="label-text my-1">Photo URL :</span>
                        </div>
                        <input
                            type="text"
                            value={photoUrl}
                            className="my-1 input input-bordered w-full max-w-xs"
                            onChange={(e) => setPhotoUrl(e.target.value)}
                        />
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                        <div className="label">
                            <span className="label-text my-1">Age:</span>
                        </div>
                        <input
                            type="text"
                            value={age}
                            className="my-1 input input-bordered w-full max-w-xs"
                            onChange={(e) => setAge(e.target.value)}
                        />
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                        <div className="label">
                            <span className="label-text my-1">Gender:</span>
                        </div>
                        <select
                            value={gender}
                            className="my-1 select select-bordered w-full max-w-xs"
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option disabled value="">
                                Pick a gender
                            </option>
                            <option value="Male" >Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>

                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                        <div className="label">
                            <span className="label-text my-1">About:</span>
                        </div>
                        <textarea
                            className="textarea my-1 h-32" placeholder="Bio"
                            value={about}
                            // className="my-1 input input-bordered w-full max-w-xs"
                            onChange={(e) => setAbout(e.target.value)}
                        />
                        </label>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary" onClick={saveProfile}>
                        Save Profile
                        </button>
                    </div>
                    </div>
                </div>
                </div>
                <UserCard
                user={{ firstName, lastName, photoUrl, age, gender, about }}
                button = {true}
                />
            </div>
            {toast && (<div className="toast toast-top toast-center">
                {error && (<div className="alert alert-error">
                    <span>Error in Profile Upadation</span>
                </div>)}
                {!error && (<div className="alert alert-success">
                    <span>Profile Saved successfully.</span>
                </div>)}
            </div>)}
        </>
      )
}

export default EditProfile