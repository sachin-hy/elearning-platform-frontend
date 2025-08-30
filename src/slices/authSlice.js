
import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    signupData:null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
};

const authSlice = createSlice(
    {
        name:"auth",
        initialState: initialState,
        reducers:{
            setSignupData(state,value){
                state.signupData = value.payload
            },
            setToken(state,value){
                state.token = value.payload;
            },
            removeToken(state){
                state.token = null;
                localStorage.removeItem("token");
            }
  
        },
    },
);

export const {setSignupData,setToken,removeToken} = authSlice.actions;

export default authSlice.reducer;