import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

import { setUser } from "../../slices/profileSlice";

export function updateProfile(formData, token) {
  return async (dispatch) => {
    try {
      console.log("Update Profile API ", formData);
      const res = await apiConnector(
        "PUT",
        profileEndpoints.PROFILEUPDATE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        },
      );

      const userData = {
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        accountType: res.data.accountType,
        additionalDetails: {
          gender: res.data.additionalDetails.gender,
          dob: res.data.additionalDetails.dob,
          about: res.data.additionalDetails.about,
          contactNumber: res.data.additionalDetails.contactNumber,
        },
        image: res.data.image,
      };

      dispatch(setUser(userData));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response.data.message };
    }
  };
}
