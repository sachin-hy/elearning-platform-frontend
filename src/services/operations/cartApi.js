import { apiConnector } from "../apiconnector";
import { cartEndpoints } from "../apis";

export async function fetchCartCourses(pageNumber, token) {
  try {
    const res = await apiConnector(
      "GET",
      cartEndpoints.GET_CART_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      {
        page: pageNumber,
      },
    );

    return { success: true, data: res.data };
  } catch (error) {
    console.log("Error while fetching cart course : " + error);
    return { success: false, message: error.response.data.message };
  }
}

export async function fetchCartCoursesSize(token) {
  try {
    const res = await apiConnector(
      "GET",
      cartEndpoints.GET_CART_COURSES_SIZE_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      null,
    );

    return { success: true, data: res.data };
  } catch (error) {
    console.log("Error while fetching cart course size : " + error);
    const message = error?.response?.data?.message || error?.message || "Unknown error";
    return { success: false, message };
  }
}

export async function addCartCourse(courseid, token) {
  try {
    const res = await apiConnector(
      "POST",
      cartEndpoints.ADD_TO_CART_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      {
        courseid: courseid,
      },
    );

    return { success: true };
  } catch (error) {
    console.log("Error while shaving the course to cart");
    return { success: false, message: error.response.data.message };
  }
}
