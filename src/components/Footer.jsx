import React from 'react';
import { BsLinkedin, BsTwitterX } from 'react-icons/bs';
import { FaFacebook, FaPhoneAlt } from 'react-icons/fa';
import { FaLocationDot, FaSquareXTwitter } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';

const Footer = () => {
    return (
        <div className='bg-[#001931]'>

        
       <footer className="grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-11/12 mx-auto text-base-content p-10 ">
       <nav className='max-w-[300px]'>
        <h2 className='text-2xl font-bold text-white' >Smart<span className='text-secondary'>Deals</span></h2>
        <p className='text-base-content'>Your trusted marketplace for authentic local products. Discover the best deals from across Bangladesh.</p>
       </nav>
  <nav>
    <h6 className="text-[18px] text-white">Quick Links</h6>
    <a className="link link-hover">All Products</a>
    <a className="link link-hover">Dashboard</a>
    <a className="link link-hover">Login</a>
    <a className="link link-hover">Register</a>
  </nav>
  <nav>
    <h6 className="text-[18px] text-white">Categories</h6>
    <a className="link link-hover">Electronics</a>
    <a className="link link-hover">Fashion</a>
    <a className="link link-hover">Home & Living</a>
    <a className="link link-hover">Groceries</a>
  </nav>
  <nav>
    <h6 className="text-[18px] text-white">Contact & Support</h6>
    <a className="link link-hover flex items-center gap-1"><MdOutlineEmail />support@Smartdeals.com</a>
    <a className="link link-hover flex items-center gap-1"><FaPhoneAlt />+880 123 456 789</a>
    <a className="link link-hover flex items-center gap-1"><FaLocationDot />123 Commerce Street, Dhaka, Bangladesh</a>
  </nav>
  <nav>
    <h6 className="text-[18px] text-white">Social Links</h6>
     <div className='flex gap-3 items-center'>
         <a className="link link-hover"><FaSquareXTwitter size={25}/></a>
      <a className="link link-hover"><BsLinkedin size={25}/> </a>
      <a className="link link-hover"><FaFacebook size={25}/> </a>
     </div>
   
  </nav>
  
</footer>
</div>
    );
};

export default Footer;