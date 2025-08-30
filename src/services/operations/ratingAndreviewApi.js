import React, { useState } from "react";
import toast from "react-hot-toast";
import { ratingAndReviewEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { removeToken } from "../../slices/authSlice"; 

export async function createReview({
  courseid,
  rating,
  review,
  token,
  navigate,
  dispatch,
  onSuccess,
  onError
}) {
  try {
    console.log("Submitting review for course:", courseid);
    
    const res = await apiConnector(
      "POST",
      ratingAndReviewEndpoints.ADD_RATING_API, 
      null,
      { Authorization: `Bearer ${token}` },
       { courseid, rating, review }
    );

    
      console.log("Review submitted successfully:", res.data);
      toast.success("Review submitted successfully!");
      if (onSuccess) onSuccess();
      return res.data;
    
  } catch (error) {
    if(error.status === 401)
    {
                      toast.error("Your session has expired. Please log in again.");
                      dispatch(removeToken())
                      navigate("/login");
     }
    console.error("Review submission failed:", error.response.data);
    const errorMsg = error.response.data || "Failed to submit review";
    toast.error(errorMsg);
    if (onError) onError(error);
    throw error;  
  }
}