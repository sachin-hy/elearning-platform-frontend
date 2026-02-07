import { setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { endpoints } from "../apis";
import { apiConnector } from "../apiconnector";

import { removeUser } from "../../slices/profileSlice";
import { removeToken } from "../../slices/authSlice";

const {
  LOGIN_API,
  SIGNUP_API,
  SENDOTP_API,
  FORGOT_PASSWORD_API,
  FORGOT_PASSWORD_TOKEN,
} = endpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    console.log("send opt fucniton inn auth api is called");
    try {
      const res = await apiConnector("POST", SENDOTP_API, null, null, {
        email: email,
      });

      if (res.status !== 200) {
        throw new Error(res.data);
      }

      return { success: true };
    } catch (error) {
      return { success: false, message: error.response.data.message };
    }
  };
}

export function signup(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
) {
  return async (dispatch) => {
    try {
      const res = await apiConnector(
        "POST",
        SIGNUP_API,
        {
          accountType,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          otp,
        },
        null,
        null,
      );

      if (res.status !== 200) {
        throw new Error(res.data);
      }

      return { success: true };
    } catch (error) {
      return { success: false, message: error.response.data.message };
    }
  };
}

export function login(email, password) {
  return async (dispatch) => {
    try {
      const res = await apiConnector(
        "POST",
        LOGIN_API,
        {
          email,
          password,
        },
        null,
        null,
      );

      const userData = {
        userId: res?.data?.userId || null,
        firstName: res?.data?.firstName || null,
        lastName: res?.data?.lastName || null,
        email: res?.data?.email || null,
        accountType: res?.data?.accountType || null,
        additionalDetails: res?.data?.additionalDetails
          ? {
              gender: res.data.additionalDetails.gender || null,
              dob: res.data.additionalDetails.dob || null,
              about: res.data.additionalDetails.about || null,
              contactNumber:
                res?.data?.additionalDetails?.contactNumber || null,
            }
          : null,
        image: res?.data?.image || null,
      };

      dispatch(setToken(res.data.token));
      dispatch(setUser(userData));
      localStorage.setItem("userId", res.data.userId);

      return { success: true };
    } catch (error) {
      return { success: false, message: error.response.data.message };
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      dispatch(removeToken());
      dispatch(removeUser());

      return { success: true };
    } catch (error) {
      console.log("Logout API ERROR............", error);
      return { success: false, message: "error while logout" };
    }
  };
}

export const forgotPassword = async (email) => {
  try {
    const res = await apiConnector("POST", FORGOT_PASSWORD_API, null, null, {
      email: email,
    });

    return { success: true };
  } catch (error) {
    console.log("Forgot Password API Error:", error);
    return { success: false, message: error.response.data.message };
  }
};

export async function updatePassword(password, confirmPassword, token) {
  try {
    const res = await apiConnector(
      "PATCH",
      FORGOT_PASSWORD_TOKEN,
      {
        password: password,
        confirmPassword: confirmPassword,
        token: token,
      },
      null,
      null,
    );

    return { success: true };
  } catch (error) {
    console.log("Update Password API Error:", error);
    return { success: false, message: error.response.data.message };
  }
}
