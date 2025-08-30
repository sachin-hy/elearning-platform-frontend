
import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    room:localStorage.getItem("room") ? JSON.parse(localStorage.getItem("room")) : [],
}

const roomSlice = createSlice({
    name: "room",
    initialState: initialState,
    reducers: {  
        setRoom(state, action) {
            state.room = action.payload;
            localStorage.setItem("room", JSON.stringify(action.payload));
        }
    }
});


export const{setRoom} = roomSlice.actions;

export default roomSlice.reducer;