import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../../services/operations/authApi"


function LoginForm()
{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    const [formData,setFormData] = useState(
        {
            email:"",
            password:"",
        }
    )

    const [showPassword,setShowPassword] = useState(false);
    const {email,password} = formData


    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }

    
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    console.log("loading value = " + loading);
    try {
       await dispatch(login(email, password, navigate));
    } catch (error) {
        console.error("Login failed:", error);
    } finally {
        setLoading(false); 
    }
  } 

  return (
    <div className="flex min-h-full items-center justify-center  px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">WELCOME BACK</h1>
          <p className="mt-2 text-sm text-richblack-100">Sign in to access your account</p>
        </div>

        <div className="mt-8 rounded-lg  p-8 shadow-lg">
          <form className="space-y-6" onSubmit={handleOnSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiOutlineEye className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <AiOutlineEyeInvisible className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={loading} 
                >
                {
                  loading ? "Signing In..." : "Sign In"
                }
              
              </button>
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;