import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';


const ResetPassword = () => {

    const { sendUserResetEmail } = useAuth();


    const handleResetPassword = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        console.log('clicked reset', email);
        sendUserResetEmail(email)
            .then(() => {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Reset passowrd Email has been sent.",
                    showConfirmButton: false,
                    timer: 1500
                });
                e.target.reset();
            })
            .catch(error => {
                console.log(error.message);

            })

    }


    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-277px)] px-4">
            <div className="bg-white/80 backdrop-blur-lg shadow-xl border border-blue-100 rounded-3xl p-8 max-w-md w-full text-center transition-all duration-500 hover:shadow-blue-200">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">Reset Password</h1>
                <p className="text-gray-500 mb-8">
                    Enter your email address below and we’ll send you a password reset link.
                </p>

                <form onSubmit={handleResetPassword} className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="email"
                        name='email'
                        required
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-3 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white"
                    />
                    <button
                        type="submit"
                        className="flex cursor-pointer items-center justify-center gap-2 bg-blue-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-600 transition-all shadow-md hover:shadow-blue-200"
                    >
                        <FaPaperPlane />
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
