
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {updatePassword} from "../services/operations/authApi"
import { useParams } from 'react-router-dom'; 
import toast from "react-hot-toast";


function UpdatePassword()
{

    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const navigate = useNavigate();
   
    const {token} = useParams();

    const handleOnChange = (e) =>
    {
        const {name,value} = e.target;

        if(name === "password")
        {
            setPassword(value);
        }else{
            setConfirmPassword(value);
        }
     
    }

    const handleOnSubmit = async (e) =>
    {
       e.preventDefault();
       const result = await updatePassword(password,confirmPassword,token);
      
       if(!result.success)
       {
         toast.error("Update Password Failed : " + result.message);
         return;
       }
        toast.success("Password reset successfully");
        navigate("/login");
      }


    return (
        <div className="flex items-center justify-center min-h-screen w-full ">
        <div className="w-full max-w-md bg-richblack-800 rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <div>
                <h2 className="text-3xl font-bold text-white mb-6">Reset Your Password</h2>
                <form onSubmit={handleOnSubmit} className="w-full">
                  <label className="text-white text-sm font-medium mb-2 block">Enter Password</label>
                  <div className="flex items-center gap-2 border border-gray-600 rounded-md p-2 bg-white">
                    
                    <input
                      type="text"
                      name="password"
                      value={password}
                      onChange={handleOnChange}
                      className="outline-none w-full text-black placeholder:text-gray-400"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <label className="text-white text-sm font-medium mb-2 block">Enter ConfirmedPassword</label>
                  <div className="flex items-center gap-2 border border-gray-600 rounded-md p-2 bg-white">
                    
                    <input
                      type="text"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleOnChange}
                      className="outline-none w-full text-black placeholder:text-gray-400"
                      placeholder="Enter your confirm password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-6 w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded-lg transition duration-200"
                  >
                    Reset Password
                  </button>
                </form>
                </div>
        
        </div>
        </div>
    )
}


export default UpdatePassword;