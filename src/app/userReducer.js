import {createSlice} from '@reduxjs/toolkit'
export const userReducer = createSlice({
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

export const {userInfo} = userReducer.actions
export default userReducer.reducer;