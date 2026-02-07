
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/operations/authApi';
import { Mail } from "lucide-react"
import toast from "react-hot-toast";

function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setEmail(e.target.value);
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const result = await forgotPassword(email);
        
        if (!result.success) {
            toast.error("Failed to send reset link: " + result.message);
            return;
          }

        toast.success("Password reset link sent to your email");
        setEmailSent(true);
      }



    return (
        <div className="flex items-center justify-center min-h-screen w-full ">
          <div className="w-full max-w-md bg-richblack-800 rounded-2xl shadow-lg p-8 flex flex-col items-center">
            
            {emailSent ? 
            (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Check Your Email</h2>
                <button
                  onClick={() => navigate("/forget-password")}
                  className="mt-6 w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded-lg transition duration-200"
                >Resend Link</button>
              </div>
            ) 
            :
            (
                <div>
                <h2 className="text-3xl font-bold text-white mb-6">Reset Your Password</h2>
                <form onSubmit={handleOnSubmit} className="w-full">
                  <label className="text-white text-sm font-medium mb-2 block">Email Address</label>
                  <div className="flex items-center gap-2 border border-gray-600 rounded-md p-2 bg-white">
                    <Mail className="text-gray-600" />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleOnChange}
                      className="outline-none w-full text-black placeholder:text-gray-400"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-6 w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded-lg transition duration-200"
                  >
                    Send Reset Link
                  </button>
                </form>
                </div>
            )}
            
            
          </div>
        </div>
      );
}

export default ForgotPassword;