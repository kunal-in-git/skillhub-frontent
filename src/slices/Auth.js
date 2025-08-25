import { createSlice } from '@reduxjs/toolkit'

export const AuthSlice = createSlice({
    name: 'isverified',
    initialState:{
        data: null, 
        image: ""
    },
    reducers: {
        setverified( state, action ){
            state.data = action.payload;
        },
        setimage( state, action ){
            state.image = action.payload;
        }
    },
})

export const { setverified, setimage } = AuthSlice.actions
export default AuthSlice.reducer