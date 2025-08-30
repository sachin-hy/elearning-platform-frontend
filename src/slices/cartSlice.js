
import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";



const initialState = {
        cartCourses: JSON.parse(localStorage.getItem("cartCourses")) || [],
    };

const cartSlice = createSlice(
    {
        name:"cart",
        initialState: initialState,
        reducers:{
     
                setCartCourses(state, action) {
                    state.cartCourses = action.payload;
                    localStorage.setItem("cardCourses", JSON.stringify(action.payload));
                    
                },
                addToCartCourses(state, action) {
                    const course = action.payload;
                    const existingCourse = state.cartCourses.find(item => item.courseid === course.courseid);
                    
                    if (existingCourse) {
                        toast.error("Course already in cart");
                    } else {
                        state.cartCourses.push(course);
                        localStorage.setItem("cartCourses", JSON.stringify(state.cartCourses));   
                  }
                },
                removeFromCartCourses(state, action) {
                    const courseId = action.payload;
                    const updatedCartCourses = state.cartCourses.filter(item => item.courseid !== courseId);
                    
                    if (updatedCartCourses.length === state.cartCourses.length) {
                        toast.error("Course not found in cart");
                    } else {
                        state.cartCourses = updatedCartCourses;
                        localStorage.setItem("cartCourses", JSON.stringify(updatedCartCourses));
                        toast.success("Course removed from cart");
                    }
                },



        },
    }
);

export const {setCartCourses,addToCartCourses,removeFromCartCourses } = cartSlice.actions;

export default cartSlice.reducer;
