import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studentCourses: localStorage.getItem("studentCourses") 
        ? JSON.parse(localStorage.getItem("studentCourses")) 
        : [], 
};

const studentCoursesSlice = createSlice({
    name: "studentCourses",
    initialState,
    reducers: {
        setStudentCourses(state, action) {
            state.studentCourses = action.payload;
            localStorage.setItem("studentCourses", JSON.stringify(action.payload));
        },
        deleteStudentCourses(state) {
            state.studentCourses = [];
            localStorage.removeItem("studentCourses");
        },
        addCourseToStudentCourses(state, action) {
            const course = action.payload; // Directly assign payload as course
            state.studentCourses.push(course);
            localStorage.setItem("studentCourses", JSON.stringify(state.studentCourses));
        }
    }
});

export const { 
    setStudentCourses, 
    addCourseToStudentCourses, 
    deleteStudentCourses 
} = studentCoursesSlice.actions;

export default studentCoursesSlice.reducer;