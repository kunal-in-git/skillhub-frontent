import { createSlice } from '@reduxjs/toolkit'

export const editslice = createSlice({
    name: 'isediting',
    initialState:{
        value: false
    },
    reducers: {
        setvalue( state ){
            state.value = true;
        }
    },
})

export const { setvalue } = editslice.actions
export default editslice.reducer