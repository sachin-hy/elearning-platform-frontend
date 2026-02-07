//export const BASE_URL = "https://elearning-platform-backend-1.onrender.com";

export const BASE_URL = "http://localhost:8080";

export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

export const endpoints = {
  LOGIN_API: BASE_URL + "/auth/login",
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  FORGOT_PASSWORD_API: BASE_URL + "/auth/forgot-password",
  FORGOT_PASSWORD_TOKEN: BASE_URL + "/auth/reset-password",
};

export const profileEndpoints = {
  PROFILEUPDATE_API: BASE_URL + "/user/update-profile",
};

export const categorysEndpoints = {
  CATEGORYS_API: BASE_URL + "/categories",
};

export const coursesEndpoints = {
  COURSECREATE_API: BASE_URL + "/course/create-course",
  COURSELISTINSTRUCTOR_API: BASE_URL + "/course/courses-instructor",
  COURSELISTSTUDENT_API: BASE_URL + "/course/courses-student",
  //COURSE_API:BASE_URL+"/course/course -> getcoursedetails",
  GET_COURSES_BY_CATEGORY: (type) => `${BASE_URL}/categories/${type}/courses`,
  COURSELISTSIZE_API: BASE_URL + "/course/courses/size",
  COURSEDELETE_API: BASE_URL + "/course/delete-course",
  GETCOURSE_BY_ID_API: BASE_URL + "/course",
  GET_COURSE_BY_ID: BASE_URL + "/course/d",
};

export const sectionEndpoints = {
  CREATESECTION_API: BASE_URL + "/create-section",
  DELETESECTION_API: BASE_URL + "/delete-section",
};

export const subsectionEndpoints = {
  CREATESUBSECTION_API: BASE_URL + "/subsection/create-subsection",
  UPDATESUBSECTION_API: BASE_URL + "/subsection/update-subsection",
  DELETESUBSECTION_API: BASE_URL + "/subsection/delete-subsection",
};

export const paymentEndpoints = {
  CREATE_ORDER_API: BASE_URL + "/create-order",
  VERIFY_PAYMENT_API: BASE_URL + "/verify-payment",
};

export const ratingAndReviewEndpoints = {
  ADD_RATING_API: BASE_URL + "/rating-and-review/create-rating",
};

export const cartEndpoints = {
  ADD_TO_CART_API: BASE_URL + "/cart",
  GET_CART_COURSES_API: BASE_URL + "/cart",
  GET_CART_COURSES_SIZE_API: BASE_URL + "/cart-size",
};

export const chatEndpoints = {
  MESSAGE_HISTORY_API: (roomId) => BASE_URL + `/history/${roomId}/message`,
  CHATROOM_API: BASE_URL + "/history/chatroom",
};
