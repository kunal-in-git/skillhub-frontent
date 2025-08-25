const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showallcategory",
}

export const user = {
    LOGIN_API: BASE_URL + "/user/login",
    OTPSEND_API: BASE_URL + "/user/otpsend",
    RESETPASS_API: BASE_URL + "/user/resetpasstoken",
    NEWPASSWORD_API: BASE_URL + "/user/resetpass",
    SIGNUP_API: BASE_URL + "/user/signup",
    MAKECONTACT_API: BASE_URL + "/user/makecontact",
    CHANGEPASSWORD_API: BASE_URL + "/user/changepassword",

    // these are the Routes relate to cart

    ADDCOURSEINCART_API: BASE_URL + "/user/addcourseincart", 
    REMOVECOURSEFROMCAT_API: BASE_URL +  "/user/deletecoursebycart",
    GETCARTDATA_API: BASE_URL + "/user/getdataofcart",
    ISALREADYENROLLED_API: BASE_URL + "/user/isAlreadyEnrolled",
}

export const profile = {
    UPLOADIMAGE_API: BASE_URL + "/profile/uploadoncloudinary",
    DELETEACCOUNT_API: BASE_URL + "/profile/deleteaccount",
    CREATEPROFILE_API: BASE_URL + "/profile/createprofile",
    GETPROFILEDATA_API: BASE_URL + "/profile/getprofiledata"
}

export const edit = {
    CHANGEIMAGE_API: BASE_URL + "/Editdata/changeImage",
    REMOVEIMAGE_API: BASE_URL + "/Editdata/RemoveImage"
}

export const course = {
    CREATECOURSE_API: BASE_URL + "/course/createcourse",
    CREATESECTION_API: BASE_URL + "/course/createsection",
    CREATESUBSECTION_API: BASE_URL + "/course/createsubsection",
    PUBLISHCOURSE_API: BASE_URL + "/course/publishCourse",
    DELETESECTION_API: BASE_URL + "/course/deletesection",
    DELETESUBSECTION_API: BASE_URL + "/course/deletesubsection",
    GETSECTION_API: BASE_URL + "/course/getsection",
    GETALLCOURSEBYUSERID_API: BASE_URL + "/course/getallcoursebyuserid",
    UPDATESUBSECTION_API: BASE_URL + "/course/updatesubsection",
    COURSEDELETION_API: BASE_URL + "/course/deletecourse",
    COURSEBYCOURSID_API: BASE_URL + "/course/getcoursedetail",
    EDITCOURSE_API: BASE_URL + "/course/editcourse",
    MARKASDONE_API: BASE_URL + "/course/markasdone",
    // category apis
    
    GETALLCATEGORY_API: BASE_URL + "/course/showallcategory",
    COURSEBYCATEGORY_API: BASE_URL + "/course/categorypagedetails",
    MOSTSELLINGCOURSE_API: BASE_URL + "/course/mostsellingcourse",
    TOPRATED_API: BASE_URL + "/course/topcourses",


    // these are related to rating and review

    CREATERATING_API : BASE_URL + "/course/createrating",
    DELETERATING_API : BASE_URL + "/course/deletereview",
    GETALLREVIEW_API : BASE_URL + "/course/getallrating"
}


export const payments = {
    MAKEPAYMENT_API: BASE_URL + '/payment/order',
    VERIFY_API: BASE_URL + '/payment/verify'
}