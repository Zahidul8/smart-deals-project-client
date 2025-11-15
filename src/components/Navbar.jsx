import React from 'react';
import { Link, Links, NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';
import { IoLogOutOutline } from 'react-icons/io5';
import LoadingSpinner from './LoadingSpinner';
import Swal from 'sweetalert2';

const Navbar = () => {
  const {user,signOutUser, loading} = useAuth();
    const links = <>
    <li><NavLink className='text-primary' to='/'>Home</NavLink></li>
    <li><NavLink className='text-primary' to='/allProducts'>All Products</NavLink></li>
    <li><NavLink className='text-primary' to='/myProducts'>My Products</NavLink></li>
    <li><NavLink className='text-primary' to='/myBids'>My Bids</NavLink></li>
    <li><NavLink className='text-primary' to='/createAProduct'>Create Product</NavLink></li>
    </>



const handleSignOut = () => {

  signOutUser()
  .then(() => {
    Swal.fire({
  position: "top-center",
  icon: "success",
  title: "Sign out successful",
  showConfirmButton: false,
  timer: 1500
});
  })
  .catch(error => {
    console.log(error.message);
    
  })

}


    return (
       <div className="navbar bg-base-100 px-4">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
    <Link className='text-primary text-3xl font-semibold' to='/'>Smart<span className='text-secondary'>Deals</span></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
   {links}
    </ul>
  </div>
  <div className="navbar-end gap-3">
    {
      loading? <LoadingSpinner></LoadingSpinner> :
      user?  <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className=" m-1"><img src={user?.photoURL} alt="" className='w-10 h-10 rounded-full cursor-pointer'/></div>
  <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm ">
    <li><Link to='/profile' className='btn text-primary'>Profile</Link></li>
    <li><button onClick={handleSignOut} className='btn text-primary'><IoLogOutOutline /> Sign Out</button></li>
  </ul>
</div> : <>
        <Link className='btn btn-gradient' to='/login'>Login</Link>
    <Link className='btn btn-gradient' to='/register'>Register</Link>
      </>
    }
    
  </div>
</div>
    );
};

export default Navbar;