import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { SignInWithGoogle,
    createUser,
    signOutUser,
    updateUserProfile,
    setLoading,

  } = useAuth();
  const navigate = useNavigate();

  const handleCreateUser = (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.image.value;
    const password = e.target.password.value;
    console.log('clicked', { displayName, email, photoURL, password });

     const hasUppercase = /[A-Z]/;
      const hasLowercase =  /[a-z]/;

      setError('');
      if (password.length < 6) {
         setError('Password must be at least 6 characters long.')
         return;
      }
      else if (!hasUppercase.test(password)) {
         setError("Password must contain at least one uppercase letter.")
        return;
      }
      else if(!hasLowercase.test(password)) {
         setError("Password must contain at least one lowercase letter.")
         return;
      }


    createUser(email, password)
      .then(result => {
        console.log(result);
        updateUserProfile(displayName, photoURL)
          .then()
          .catch(error => {
            console.log(error.message);

          })
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Register successful",
          showConfirmButton: false,
          timer: 1500
        });

        signOutUser()
          .then(() => {
            console.log('signOut');

          })
          .catch(error => {
            console.log(error.message);

          })
        navigate('/');
        e.target.reset();

      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try agian later.",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
        console.log(error);

      })
      .finally(() => {
        setLoading(false)
      })


  }

  const handleSignInWithGoogle = () => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 1200);
    SignInWithGoogle()
      .then(result => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500
        });

        console.log(result.user);

      })
      .catch(error => {
        console.log(error.message);

      })
      .finally(() => {
        clearTimeout(timeout)
        setLoading(false)
      })

  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-277px)] my-10">
      <div className="w-[480px] bg-white shadow-xl rounded-xl p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Register Now!
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Already have an account?{" "}
          <Link to='/login' href="#" className="text-secondary font-medium hover:underline">
            Login Now
          </Link>
        </p>

        {/* Form */}
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="smsowkothasan@gmail.com"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Image-URL</label>
            <input
              type="text"
              name="image"
              placeholder="https://example.com/profile.jpg"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : "password"}
                name="password"
                placeholder="Your password"
                className="input input-bordered w-full"
              />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute top-3 right-3 z-10">
                {
                  showPassword ? <FaEyeSlash /> : <FaEye />
                }
              </span>
            <p className="text-sm text-red-600 ">{error}</p>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full cursor-pointer py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] hover:opacity-90 transition-all duration-300"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign Up */}
        <button onClick={handleSignInWithGoogle} className="btn w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium">
          <FcGoogle className="text-xl mr-2" />
          Sign Up With Google
        </button>
      </div>
    </div>
  );
};

export default Register;
