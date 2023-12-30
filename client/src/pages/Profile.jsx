import React, { useState, useRef , useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {app} from '../firebase.js'
import { getStorage, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import {
  updateUserSuccess,
  updateUserStart,
  updateUserFailure,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart
} from '../redux/user/userSlice.js';

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector( state => state.user)

  const fileRef = useRef(null)
  const [ file, setFile ] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setfileUploadError] = useState(false)
  const [formData , setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false);
 // Firebase storage Rules
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches("image/.*")
  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])
  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on('state_changed', (snapshot)=> {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
      setFilePerc(Math.round(progress))
    },
    (error) => {
      setfileUploadError(true)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL })
        }
      )}
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      console.log(error)
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e) => setFile(e.target.files[0])}/>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-full cursor-pointer h-24 w-24 object-cover self-center mt-2'/>
        <p className='text-sm self-center'>
          { fileUploadError ? 
            (<span className='text-red-700'>Error image Upload(Image should be less than 2 MB)</span>) :
            filePerc > 0 && filePerc < 100 ? 
              (<span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>):
            filePerc === 100 ? 
              (<span className='text-green-700'>Image Successfully Uploaded!</span>) : ("")
          }
        </p>
        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
        />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-3'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>   
        { updateSuccess ? 'User is updated successfully!' : ''}
      </p>
    </div>
  )
}
