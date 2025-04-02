import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const feedSlice = createSlice({
    name: "feed",
    initialState,
    reducers:{
        addFeed: (state,action)=>action.payload,
        removeUserFromFeed: (state,action)=>{
            const newFeed = state.filter(user=>user.id !== action.payload)
            return newFeed;
        },
    }
})

export const {addFeed, removeUserFromFeed} = feedSlice.actions;

export default feedSlice.reducer;