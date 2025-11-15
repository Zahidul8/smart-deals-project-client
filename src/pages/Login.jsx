import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const {SignInWithGoogle,signInUserWithEmail,setLoading} = useAuth();
  const location = useLocation();
  const navigate = useNavigate()

  const handleSignWithEmail = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log('clicked',{email, password});
    
    signInUserWithEmail(email, password)
    .then(result => {
      console.log(result.user);
      Swal.fire({
  position: "top-center",
  icon: "success",
  title: "User signIn successfully",
  showConfirmButton: false,
  timer: 1500
});
      navigate(location?.state || '/')
      e.target.reset();
      
    })
    .catch(error => {
      if (error.code === 'auth/invalid-credential') {
              Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Please provide valid email and password",
  footer: '<a href="#">Why do I have this issue?</a>'
});
      }
      console.log(error.code);
      
    })
    .finally(()=> {
      setLoading(false);
    })

  }

  const handleSignInWithGoogle = () => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1200);
    SignInWithGoogle()
    .then(result => {
      Swal.fire({
  position: "top-center",
  icon: "success",
  title: "User signIn successfully",
  showConfirmButton: false,
  timer: 1500
});
      console.log(result.user);
      navigate(location?.state || '/')
      
    })
    .catch(error => {
      console.log(error.message);
      
    })
    .finally(() => {
      clearTimeout(timeout);
      setLoading(false);
    })

  }



  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-277px)]">
      <div className="w-[465px] bg-white shadow-xl rounded-xl p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Login</h2>
        <p className="text-center text-gray-500 mb-6">
          Don&apos;t have an account?{" "}
          <Link to='/register' href="#" className="text-[#632EE3] font-medium hover:underline">
            Register Now
          </Link>
        </p>

        {/* Form */}
        <form onSubmit={handleSignWithEmail} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="sm­sowkothasan@gmail.com"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Password</label>
           <div  className="relative">
             <input
              type={ showPassword? 'text':"password"}
              name="password"
              placeholder="Your password"
              className="input input-bordered w-full"
            />
               <span onClick={() => setShowPassword(!showPassword)} className="absolute top-3 right-3 z-10">
              {
                showPassword? <FaEyeSlash />: <FaEye />
              }
            </span>
           </div>
         
          </div>

          <div className="text-right text-sm">
            <Link to='/resetPassword' href="#" className="text-gray-500 hover:text-[#632EE3]">
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full cursor-pointer py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:opacity-90 transition-all duration-300"
          >
            Sign In
          </button>
        </form>

        {/* OR divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Button */}
        <button onClick={handleSignInWithGoogle} className="btn w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium">
          <FcGoogle className="text-xl mr-2" />
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
