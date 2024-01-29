import {createSlice} from '@reduxjs/toolkit'
export const userInfoSlice = createSlice({
    name: "user",
    initialState: {
        value: null
    },
    reducers: {
        userInfo: (state,action)=>{
            state.value = action.payload
        }
    }
})

export const {userInfo} = userInfoSlice.actions
export default userInfoSlice.reducer;