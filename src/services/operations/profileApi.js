import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import { setUser } from "../../slices/profileSlice"
import { logout } from "./authApi";
import { removeToken } from "../../slices/authSlice";


export function updateProfile(formData,token,navigate)
    {
        return async (dispatch) => {
            try {
                
                console.log("Update Profile API ", formData);
                const res = await apiConnector("PUT",profileEndpoints.PROFILEUPDATE_API, formData,{
                    Authorization: `Bearer ${token}`,
                  });
      
                console.log("Update Profile API Response:", res.data);

              

                const userData = {
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    accountType: res.data.accountType,
                    additionalDetails: {
                        gender: res.data.additionalDetails.gender,
                        dob: res.data.additionalDetails.dob,
                        about: res.data.additionalDetails.about,
                        contactNumber: res.data.additionalDetails.contactNumber
                    },
                    image : res.data.image,
                    }


                    dispatch(setUser(userData));
                    localStorage.setItem("user",JSON.stringify(userData));
                    navigate("/dashboard/my-profile");
                }
                 catch(error)
                {
                    
                    if(error.status === 401)
                    {
                      toast.error("Your session has expired. Please log in again.");
                      dispatch(removeToken())
                      navigate("/login");
                    }
                    
                    console.log("Update Profile API Error:", error);
             
                    if (error.response && error.response.status === 401) {
                        toast.error("Session expired. Please log in again.");
                        dispatch(logout(navigate));
                    } else {
                        toast.error("Profile update failed. Please try again.");
                    }
                }
         }
    }
