import { createSlice } from '@reduxjs/toolkit'

export const Dashboardslice = createSlice({
    name: 'Dashboard',
    initialState:{
        page: 1
    },
    
    reducers: {
        increamentpage(state){
            if( state.page < 3 ){
                state.page += 1;
            }
        },
        decrementpage(state){
            if( state.page > 0 ){
                state.page -= 1;
            }
        }
    },
})

export const { increamentpage, decrementpage } = Dashboardslice.actions
export default Dashboardslice.reducer