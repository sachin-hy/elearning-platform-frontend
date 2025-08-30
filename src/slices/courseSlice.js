import { createSlice } from "@reduxjs/toolkit";


//  store all the courses basis on the category selected by the user like all,python,web etc


const initialState = {

    allCourses: localStorage.getItem("allCourses") ? JSON.parse(localStorage.getItem("allCourses")) : [],
};

const courseSlice = createSlice({

    name: "course",
    initialState: initialState,

    reducers: {

        setAllCourses(state, action) {
            state.allCourses = action.payload;
            localStorage.setItem("allCourses", JSON.stringify(action.payload));
        },
        resetAllCourses(state) {
            state.allCourses = [];
            localStorage.removeItem("allCourses");
        },



    },


});

export const {setAllCourses,resetAllCourses} = courseSlice.actions;

export default courseSlice.reducer;