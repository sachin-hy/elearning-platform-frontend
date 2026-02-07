import React, { useState } from "react";

import { ratingAndReviewEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

export async function createReview({ courseid, rating, review, token }) {
  try {
    const res = await apiConnector(
      "POST",
      ratingAndReviewEndpoints.ADD_RATING_API,
      null,
      { Authorization: `Bearer ${token}` },
      { courseid, rating, review },
    );

    return { success: true };
  } catch (error) {
    console.error("Error submitting review:", error);
    return { success: false, message: error.response.data.message };
  }
}
