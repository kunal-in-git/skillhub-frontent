import { combineReducers } from "@reduxjs/toolkit";
import passwordslice from "../slices/passwordslice.js"
import Signupslice from "../slices/Signupslice.js";
import AuthSlice from '../slices/Auth.js'
import  Dashboardslice from "../slices/Dashboard.js";
import editslice from "../slices/Editingcourse.js"

const rootReducer = combineReducers({
    signup : Signupslice,
    ispasschanged: passwordslice,
    isverified : AuthSlice,
    Dashboard : Dashboardslice,
    isediting : editslice
})

export default rootReducer