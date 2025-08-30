
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import {toast} from "react-hot-toast"
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authApi";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"



function Tab({ tabData, field, setField }) {
    return (
      <div className="flex border-b mb-6">
        {tabData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setField(tab.type)}
            className={`py-2 px-4 font-medium ${
              field === tab.type ? "border-b-2 border-blue-500 text-white" : "text-gray-500"
            }`}
            type="button"
          >
            {tab.tabName}
          </button>
        ))}
      </div>
    )
  }





function SignupForm()
{

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [accountType,setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const [formData,setFormData] = useState(
        {
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    );

     
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {firstName, lastName, email, password, confirmPassword} = formData;


  const handleOnChange=(e)=>{
    setFormData((prevData) => ({
        ...prevData,[e.target.name] : e.target.value,
    }))
  }

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]



 
   const handleOnSubmit = (e) => {
      
      e.preventDefault()

      if(password !== confirmPassword){
        toast.error("Password Do Not Match")
        return
      }

      const signupData = {
        ...formData,
        accountType,
      }

      console.log("send opt fucniton is called from signup from page")
      // setting sign up data to state
      //to be used after otp verification
      dispatch(setSignupData(signupData))
      //send otp to user for verification
      dispatch(sendOtp(formData.email,navigate))

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      setAccountType(ACCOUNT_TYPE.STUDENT)
   }


   return (
    <div className=" flex flex-col min-h-screen items-center justify-center  px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-2xl text-white font-bold text-center mb-6">Create Account</h2>

      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      {/**Form */}
      <form onSubmit={handleOnSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <p className="mb-1 font-medium text-white">
              First Name <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block">
            <p className="mb-1 font-medium text-white">
              Last Name <sup className="text-red-500">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

        <label className="block">
          <p className="mb-1 font-medium text-white">
            Email Address <sup className="text-red-500">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <p className="mb-1 font-medium text-white">
              Create Password <sup className="text-red-500">*</sup>
            </p>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
            </div>
          </label>

          <label className="block">
            <p className="mb-1 font-medium text-white">
              Confirm Password <sup className="text-red-500">*</sup>
            </p>
            <div className="relative">
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black"
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
            </div>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Account
        </button>
      </form>
    </div>
  )


}

export default SignupForm;