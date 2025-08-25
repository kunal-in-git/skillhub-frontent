import { createSlice } from '@reduxjs/toolkit'

export const Signupslice = createSlice({
    name: 'signup',
    initialState:{
        // token: localStorage.getItem("token") ? JSON.parse( localStorage.getItem("Item")): null
        data: []
    },
    reducers: {
        setsignupdata( state, value ){
            state.data = value.payload;
        },

            // giving error
            
        // setsignupdatawithOTP( state, value ){
        //     state.data[0].push_back(value.payload)
        // }
    },
})

// export const { setsignupdata, setsignupdatawithOTP } = Signupslice.actions
export const { setsignupdata } = Signupslice.actions
export default Signupslice.reducer