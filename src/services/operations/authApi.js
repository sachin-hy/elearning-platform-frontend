

import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";

import { removeUser } from "../../slices/profileSlice";
import {removeToken} from "../../slices/authSlice";

import { deleteInstructorCourses} from "../../slices/instructorCoursesSlice";
import { deleteStudentCourses } from "../../slices/studentCoursesSlice";



const {
    LOGIN_API,
    SIGNUP_API,
    SENDOTP_API,
    FORGOT_PASSWORD_API,
    FORGOT_PASSWORD_TOKEN,
} = endpoints



export function sendOtp(email,navigate)
{
    return async (dispatch) =>{
        console.log("send opt fucniton inn auth api is called")
        try{
             const res = await apiConnector("POST",SENDOTP_API,null,null,{
                    email: email  
             });

            
            console.log("Sendotp api");
            console.log(res.data);

            if(res.status !== 200)
            {
                throw new Error(res.data);
            }

            toast.success("OTP sent Successfully")
            navigate("/verify-email")
        }catch(error)
        {
            console.log("SENDOPT API ERROR............");
            if(Number(error.status) === Number(201))
            {
                toast.error("Your session has expired. Please log in again.");
                navigate("/login");
            }
            toast.error(error.response.data.message);
        } 
    }
}


export function signup(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){

    return async (dispatch) =>{
        try{

             const res = await apiConnector("POST",SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                 otp,
                },null,null)

                console.log("SIgnup api response.......")

                if(res.status !== 200)
                {
                    throw new Error(res.data);
                }

                toast.success("Signup Successful")
                navigate("/login")
        }catch(error)
        {
            console.log("SIGNUP API ERROR............", error)
            toast.error(error.response.data.message);
            navigate("/signup")
        }
    }
}




export function login(email, password,navigate)
{
    return async(dispatch) =>{
        try{
            const res = await apiConnector("POST",LOGIN_API,{
                email,password,
            },null,null)

            console.log("LOGIN API RESPONSE.....",res.data);

           console.log(res.data.firstName);
           console.log("token = " , res.data.token);
            const userData = {
                userId:res?.data?.userId || null,
                firstName: res?.data?.firstName || null,
                lastName: res?.data?.lastName || null,
                email: res?.data?.email || null,
                accountType: res?.data?.accountType || null,
                additionalDetails: res?.data?.additionalDetails
                ? {
                    gender: res.data.additionalDetails.gender || null,
                    dob: res.data.additionalDetails.dob || null,
                    about: res.data.additionalDetails.about || null,
                    contactNumber: res?.data?.additionalDetails?.contactNumber || null,
                }
                : null,
                image: res?.data?.image || null,
            };




            console.log("account type of user =  " + userData.accountType);
            console.log("user data = " , userData);
           dispatch(setToken(res.data.token));
           dispatch(setUser(userData));
        
       

        console.log("before token set in local storage");
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("user",JSON.stringify(userData));

        toast.success("Login successful");
       
        navigate("/dashboard/my-profile");
        }catch(error)
        {
           const errorMessage = error.response.data.message;
           toast.error(errorMessage);
           console.log("Login api error....... in the login in function",error);
    
        }
    }
}



export function logout(navigate)
{
    return async (dispatch) => {
        try {
            
            dispatch(removeToken());
            dispatch(removeUser());
            dispatch(deleteInstructorCourses());
            dispatch(deleteStudentCourses());
            navigate("/");
            toast.success("Logout successful");
            
        } catch (error) {
            toast.error("Error during logout. Please try again.");
            console.log("Logout API Error:", error);
        }
    };
}


export function forgotPassword(email,setEmailSent)
{
    return async (dispatch) => {
        try {
            const res = await apiConnector("POST",FORGOT_PASSWORD_API,null,null,{
                email : email
            });

            console.log("Forgot Password API Response:");
             
            toast.success("Password reset link sent to your email");
            setEmailSent(true);
        } catch (error) {
           const errorMessage = error.response.data.message;
           toast.error(errorMessage);
            console.log("Forgot Password API Error:", error);
            
        }
    };
}


export function updatePassword(password,confirmPassword,token,navigate)
{
    return async (dispatch) =>
    {
        try{

            const res = await apiConnector("PATCH",FORGOT_PASSWORD_TOKEN,{
                password : password,
                confirmPassword : confirmPassword,
                token : token
            },null,null);

            toast.success("Password reset successfully");
            navigate("/login");
        }catch(error)
        {
            console.log("update Password API Error:", error);
            toast.error(error.response.data.message);
        }
    };
}