
import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import courseReducer from "../slices/courseSlice"
import studentCoursesReducer from "../slices/studentCoursesSlice";
import instructorCoursesReducer from "../slices/instructorCoursesSlice";
import roomReducer from "../slices/roomSlice";



const rootReducer = combineReducers(
    {
        auth: authReducer,
        profile:profileReducer,
        cart:cartReducer,
        course:courseReducer,
        studentCourses: studentCoursesReducer,
        instructorCourses: instructorCoursesReducer,
        room:roomReducer
    }
)

export default rootReducer;