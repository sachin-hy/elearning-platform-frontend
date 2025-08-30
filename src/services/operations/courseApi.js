import {
    apiConnector
} from "../apiconnector";
import {
    coursesEndpoints,
    subsectionEndpoints,
    sectionEndpoints
} from "../apis";

import toast from "react-hot-toast";
import {
    setAllCourses
} from "../../slices/courseSlice";

import {
    ACCOUNT_TYPE
} from "../../utils/constants";

import {
    setStudentCourses,
    deleteStudentCourses
} from "../../slices/studentCoursesSlice";
import {
    setInstructorCourses,
    addSubSectionToInstructorCourses,
    removeCourseFromInstructorCourses,
    removeSubSectionFromInstructorCourses,
    updateSubSectionFromInstructorCourses,
    addSectionToInstructorCourses,
    removeSectionFromInstructorCourses,
    addCourseToInstructorCourses,
    deleteInstructorCourses
} from "../../slices/instructorCoursesSlice";
import {
    removeToken
} from "../../slices/authSlice";



export async function courseCreate(formData, navigate, dispatch, token, setCourseid) {

    try {

        const res = await apiConnector("POST", coursesEndpoints.COURSECREATE_API, formData, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }, null);


        setCourseid(res.data.courseid);
        dispatch(addCourseToInstructorCourses({
            course: res.data
        }));
        toast.success("Course Created Successfully");
        navigate("/dashboard/sectioninfo");



    } catch (error) {

    
        if (error.status === 401) {
            toast.error("Your session has expired. Please log in again.");
            dispatch(removeToken())
            navigate("/login");
        }

        else if(error.status === 400)
        {
           toast.error(error.response.data);
        }
        else if(error.status === 500){
           toast.error(error.response.data);

        }else{
          toast.error(error.response.data);
        }
    }

}

export async function deleteCourse(courseid, navigate, dispatch, token) {
    try {
        const res = await apiConnector("DELETE", coursesEndpoints.COURSEDELETE_API, null, {
            Authorization: `Bearer ${token}`
        }, {
            courseid: courseid
        });

        dispatch(removeCourseFromInstructorCourses({
            courseid
        }));


        toast.success("Course Deleted Successfuly");

        navigate("/dashboard/my-courses");
    } catch (error) {
        console.log(error);
        if (error.status === 401) {
            toast.error("Your session has expired. Please log in again.");
            dispatch(removeToken())
            navigate("/login");
        }
        else if(error.status === 404)
        {
           toast.error(error.response.data);
        }else if(error.status === 500){
          toast.error(error.response.data);
        }else{
              toast.error(error.response.data);
        }
        
        
    }
}


export async function createSection(formData, navigate, token, setSectionid, dispatch, courseid) {
    try {

        const res = await apiConnector("POST", sectionEndpoints.CREATESECTION_API, formData,

            {
                Authorization: `Bearer ${token}`
            }, null
        )

       
            setSectionid(res.data.id);
            console.log("Section Created Successfully" + res.data);
            dispatch(addSectionToInstructorCourses({
                courseid,
                section: res.data
            }));
            toast.success("Section Created Successfully");
            navigate("/dashboard/sectioninfo");
       
    } catch (error) {
        if (error.status === 401) {
            toast.error("Your session has expired. Please log in again.");
            dispatch(removeToken())
            navigate("/login");
        }else {
           toast.error(error.response.data);
        }
        
    }
}

export async function deleteSection(sectionid, navigate, token, dispatch, courseid) {
    try {
        const res = await apiConnector("DELETE", sectionEndpoints.DELETESECTION_API, null, {
            Authorization: `Bearer ${token}`
        }, {
            sectionid: sectionid
        });

        console.log("section detelet response " + res);

        dispatch(removeSectionFromInstructorCourses({
            courseid,
            sectionid
        }));

        toast.success("Section Deleted Successfully");
        navigate("/dashboard/sectioninfo");

    } catch (error) {
        if (error.status === 401) {
            toast.error("Your session has expired. Please log in again.");
            dispatch(removeToken())
            navigate("/login");
        }else{
          toast.error(error.response.data);
        }     
    }
}



export async function createSubsection(formData, navigate, token, dispatch, courseid) {
    try {
        console.log("subsection data", formData);
        const res = await apiConnector("POST", subsectionEndpoints.CREATESUBSECTION_API, formData, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }, null);

        const sectionid = formData.sectionid;
        toast.success("Subsection created");
        dispatch(addSubSectionToInstructorCourses({
            courseid,
            sectionid,
            subsection: res.data
        }));
        navigate("/dashboard/sectioninfo")


    } catch (error) {
        if (error.status === 401) {
            toast.error("Your session has expired. Please log in again.");
            dispatch(removeToken())
            navigate("/login");
        }else{
          toast.error(error.response.data);
        }
        
    }
}


export async function updateSubSection(formData, navigate, dispatch, token, courseid, sectionid, subsectionid) {
    try {

        const res = await apiConnector("PUT", subsectionEndpoints.UPDATESUBSECTION_API, formData, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }, null);

        dispatch(updateSubSectionFromInstructorCourses({
            courseid,
            sectionid,
            subsectionid,
            newsubsection: res.data
        }));


        toast.success("Subsection updated successfully");
        navigate("/dashboard/sectioninfo");

    } catch (error) {
        if (error.status === 401) {
            toast.error("Your session has expired. Please log in again.");
            dispatch(removeToken())
            navigate("/login");
        }
        else{
            toast.error(error.response.data);
        }
        
    }
}




export async function deleteSubSection(courseid, sectionid, subSectionid, dispatch, navigate, token) {
    try {
        const res = await apiConnector("DELETE", subsectionEndpoints.DELETESUBSECTION_API, null, {
            Authorization: `Bearer ${token}`
        }, {
            subsectionid: subSectionid
        });

        dispatch(removeSubSectionFromInstructorCourses({
            courseid,
            sectionid,
            subSectionid
        }));
        toast.success("subsection deleted successfully");
        console.log("subsection deleted");
        navigate("/dashboard/sectioninfo");


    } catch (error) {
        if (error.status === 401) {
            toast.error("Your session has expired. Please log in again.");
            dispatch(removeToken())
            navigate("/login");
        }else{
            toast.error(error.response.data);
        }
        
    }
}




//allcoursehomepage
export async function fetchCourse(dispatch, type, pageNumber = 0) {

    try {
        const res = await apiConnector("GET", coursesEndpoints.GET_COURSES_BY_CATEGORY(type), null, null, {

            page: pageNumber
        });

        console.log(res.data);
        dispatch(setAllCourses(res.data));

    } catch (error) {
         dispatch(setAllCourses([]));
        toast.error(error.response.data);
    }

}


//  allcoursehomepage
export async function fetchCourseSize(type, dispatch, setCourseButton) {
    try {

        const res = await apiConnector("GET", coursesEndpoints.COURSELISTSIZE_API, null, null, {
            type: type,
        });

        const size = Math.ceil(res.data / 2);

        let buttons = [];
        for (let i = 0; i < size; i++) {
            buttons.push(i);
        }

        setCourseButton(buttons);


    } catch (error) {
        setCourseButton([]);
        toast.error(error.response.data);
    }

}




// mycourses page
export async function fetchUserCourses(token, user, dispatch, navigate) {
    try {
        if (user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            const res = await apiConnector(
                "GET",
                coursesEndpoints.COURSELISTINSTRUCTOR_API,
                null, {
                    Authorization: `Bearer ${token}`
                },
                null
            );
            console.log("Total Items Api Response:", res.data);
            dispatch(setInstructorCourses(res.data));

        } else if (user.accountType === ACCOUNT_TYPE.STUDENT) {

            const res = await apiConnector(
                "GET",
                coursesEndpoints.COURSELISTSTUDENT_API,
                null, {
                    Authorization: `Bearer ${token}`
                },
                null
            );

            console.log("Courses Enrolled Response:", res.data);
            dispatch(setStudentCourses(res.data));

        }
    } catch (error) {
       console.log(error);
       
       dispatch(deleteInstructorCourses());
       dispatch(deleteStudentCourses());
       
        if (error.status === 401) {
            toast.error("Your session has expired. Please log in again.");
            dispatch(removeToken())
            navigate("/login");
        }
        else{
             
             toast.error(error.response.data);
        }
     
    }

}