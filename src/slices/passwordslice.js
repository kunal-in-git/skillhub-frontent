import { createSlice } from '@reduxjs/toolkit'

export const passwordslice = createSlice({
    name: 'ispasschanged',
    initialState:{
        // totalItems: localStorage.getItem("totalItems") ? JSON.parse( localStorage.getItem("totalItems") ) : 0
        value: false
    },
    reducers: {
        passchanged( state ){
            state.value = true;
        }
    },
})

export const { passchanged } = passwordslice.actions
export default passwordslice.reducer