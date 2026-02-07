import { apiConnector } from "../apiconnector";
import {
  coursesEndpoints,
  subsectionEndpoints,
  sectionEndpoints,
} from "../apis";

import { ACCOUNT_TYPE } from "../../utils/constants";

export async function createCourse(formData, token) {
  try {
    const res = await apiConnector(
      "POST",
      coursesEndpoints.COURSECREATE_API,
      formData,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      null,
    );
    return { success: true, data: res.data };
  } catch (error) {
    console.log("Error while creating course: " + error);
    return { success: false, message: error.response.data.message };
  }
}

export async function deleteCourse(courseid, token) {
  try {
    const res = await apiConnector(
      "DELETE",
      coursesEndpoints.COURSEDELETE_API,
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
    console.log("Error while Deleting Course : " + error);
    return { success: true, message: error.respone.data.message };
  }
}

export async function createSection(formData, token) {
  try {
    const res = await apiConnector(
      "POST",
      sectionEndpoints.CREATESECTION_API,
      formData,
      {
        Authorization: `Bearer ${token}`,
      },
      null,
    );

    console.log("section rsult after creation ", res.data);

    return { success: true, data: res.data };
  } catch (error) {
    console.log("Error while creating section: " + error);
    return { success: false, message: error.response.data.message };
  }
}

export async function deleteSection(sectionid, token, courseid) {
  try {
    console.log(sectionid, courseid);
    const res = await apiConnector(
      "DELETE",
      sectionEndpoints.DELETESECTION_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      {
        sectionid: sectionid,
      },
    );

    return { success: true };
  } catch (error) {
    console.log("Error while deleting section: " + error);
    return { success: false, message: error.response.data.message };
  }
}

export async function createSubsection(formData, token) {
  try {
    const res = await apiConnector(
      "POST",
      subsectionEndpoints.CREATESUBSECTION_API,
      formData,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      null,
    );
    return { success: true, data: res.data };
  } catch (error) {
    console.log("Error while creating subsection: " + error);
    return { success: false, message: error.response.data.message };
  }
}

export async function updateSubSection(formData, token) {
  try {
    console.log("form data to send to the update" + formData);
    const res = await apiConnector(
      "PUT",
      subsectionEndpoints.UPDATESUBSECTION_API,
      formData,
      {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      null,
    );

    return { success: true, data: res.data };
  } catch (error) {
    console.log("Error while updating subsection: " + error);
    return { success: false, message: error.response.data.message };
  }
}

export async function deleteSubSection(subSectionid, token) {
  try {
    const res = await apiConnector(
      "DELETE",
      subsectionEndpoints.DELETESUBSECTION_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      {
        subsectionid: subSectionid,
      },
    );
    return { success: true };
  } catch (error) {
    console.log("Error while deleting subsection: " + error);
    return { success: false, message: error.response.data.message };
  }
}

export async function fetchCourses(type, pageNumber = 0) {
  try {
    const res = await apiConnector(
      "GET",
      coursesEndpoints.GET_COURSES_BY_CATEGORY(type),
      null,
      null,
      {
        page: pageNumber,
      },
    );

    return { success: true, data: res.data };
  } catch (error) {
    console.log("Error while fetching  courses : " + error);
    return { success: false, message: error.response.data.message };
  }
}

//  allcoursehomepage
export async function fetchCourseSize(type, setCourseButton) {
  try {
    const res = await apiConnector(
      "GET",
      coursesEndpoints.COURSELISTSIZE_API,
      null,
      null,
      {
        type: type,
      },
    );

    return { success: true, data: res.data };
  } catch (error) {
    setCourseButton([]);
    return { success: false, message: error.response.data.message };
  }
}

export async function fetchUserCourses(token, accountType) {
  try {
    if (accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      const res = await apiConnector(
        "GET",
        coursesEndpoints.COURSELISTINSTRUCTOR_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        },
        null,
      );

      return { success: true, data: res.data };
    } else if (accountType === ACCOUNT_TYPE.STUDENT) {
      const res = await apiConnector(
        "GET",
        coursesEndpoints.COURSELISTSTUDENT_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        },
        null,
      );

      return { success: true, data: res.data };
    }
  } catch (error) {
    console.log("Error while fetching courses : " + error);

    return { success: false, message: error.response.data.message };
  }
}

export async function getCourseDetails(courseid, token) {
  try {
    const res = await apiConnector(
      "GET",
      coursesEndpoints.GETCOURSE_BY_ID_API + `/${courseid}`,
      null,
      {
        Authorization: `Bearer ${token}`,
      },
      null,
    );
    return { success: true, data: res.data };
  } catch (error) {
    console.log("Error while fetching course details:", error);
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    return { success: false, message };
  }
}

export async function fetchCourseFun(courseid) {
  try {
    const res = await apiConnector(
      "GET",
      coursesEndpoints.GET_COURSE_BY_ID + `/${courseid}`,
      null,
      null,
      null,
    );
    return { success: true, data: res.data };
  } catch (error) {
    console.log("Error while fetching course details:", error);
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    return { success: false, message };
  }
}
