import React from 'react';
import useAuth from '../hooks/useAuth';
import { FaUserEdit, FaCog, FaEnvelope } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Profile = () => {
  const { user,updateUserProfile,setLoading } = useAuth();


  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const photoURL = e.target.photo.value;
    console.log('clicked form profile', displayName, photoURL);

    updateUserProfile(displayName, photoURL)
    .then(() => {
        Swal.fire({
  position: "top-center",
  icon: "success",
  title: "Profile updated successfully",
  showConfirmButton: false,
  timer: 1500
});
        e.target.reset();
    })
    .catch(error => {
        console.log(error.message);
        
    })
    .finally(() => {
        setLoading(false);
    })
    
  }

  return (
    <div className=" flex items-center justify-center px-4 min-h-[calc(100vh-277px)]">
      <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-sm w-full text-center border border-blue-100 transition-all duration-500 hover:shadow-blue-200">
        {/* Profile Image */}
        <div className="relative">
          <div className="max-w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-blue-300 shadow-lg hover:scale-105 transition-transform duration-300">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* User Info */}
        <h1 className="mt-6 text-2xl font-bold text-gray-800">
          {user?.displayName || "User Name"}
        </h1>
        <p className="text-gray-500 mt-1">{user?.email || "example@email.com"}</p>

        {/* Icons */}
        <div className="flex justify-center gap-6 mt-6">
          <button className="text-blue-500 hover:text-blue-700 text-2xl transition-transform transform hover:scale-125">
            <FaUserEdit title="Edit Profile" />
          </button>
          <button className="text-blue-500 hover:text-blue-700 text-2xl transition-transform transform hover:scale-125">
            <FaCog title="Settings" />
          </button>
          <button className="text-blue-500 hover:text-blue-700 text-2xl transition-transform transform hover:scale-125">
            <FaEnvelope title="Messages" />
          </button>
        </div>

        {/* Update Form */}
        <form onSubmit={handleUpdateProfile} className="mt-8 space-y-4">
          <input
            type="text"
            name='name'
            placeholder="Update name"
            className="w-full px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            name='photo'
            placeholder="Update photo url"
            className="w-full px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            type="submit"
            className="w-full cursor-pointer py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all shadow-md"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
