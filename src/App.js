import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login.js";
import SignUp from "./Pages/SignUp.js";
import Forgotpassword from "./Pages/Forgotpassword.js";
import Newpassword from "./Pages/Newpassword.js";
import Passwordchanged from "./Pages/Passwordchanged.js";
import OTP from "./Pages/OTP.js";
import Aboutus from "./Pages/Aboutus.js";
import Dashboard from "./Pages/Dashboard.js";
import ContactUs from "./Pages/ContactUs.js";
import Profile from "./component/Dashboard/Profile.js";
import Setting from "./component/Dashboard/Setting.js";
import EnrolledCourses from "./component/Dashboard/EnrolledCourses.js";
import CreateCourse from "./component/Dashboard/CreateCourse.js";
import Mycourse from "./component/Dashboard/Mycourse.js";
import Devops from "./component/Home/Catalog/Devops.js";
import WebDev from "./component/Home/Catalog/WebDev.js";
import Java from "./component/Home/Catalog/Java.js";
import DSA from "./component/Home/Catalog/DSA.js";
import CourseDetail from "./component/Dashboard/CourseDetail.js";
import Cart from "./Pages/Cart.js";
import Viewcourse from "./component/Dashboard/Viewcourse.js";
import Instructordata from "./component/Dashboard/Instructordata.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/Login/Forgotpassword" element={<Forgotpassword />}></Route>
        <Route path="/Newpassword/:id" element={<Newpassword />}></Route>
        <Route path="/Passwordchanged" element={<Passwordchanged />}></Route>
        <Route path="/otp" element={<OTP />}></Route>
        <Route path="/Aboutus" element={<Aboutus />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/cart" element={<Cart />}></Route>

        <Route path="/user/Dashboard" element={<Dashboard />}>
          <Route index element={<Profile />} /> {/* Default to Profile */}
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Setting />} />
          <Route path="EnrolledCourses" element={<EnrolledCourses />} />
          <Route path="create-course" element={<CreateCourse />} />
          <Route path="Mycourse" element={<Mycourse />} />
          <Route path="Instructordata" element={<Instructordata />} />
        </Route>

        <Route path="/catalog/DSA" element={<DSA />} />
        <Route path="/catalog/Devops" element={<Devops />} />
        <Route path="/catalog/Web Development" element={<WebDev />} />
        <Route path="/catalog/Java" element={<Java />} />

        <Route path="/catalog/:category/:courseId" element={<CourseDetail />} />
        <Route path="/EnrolledCourses/:courseId" element={<Viewcourse/>}/>
      </Routes>
    </div>
  );
}

export default App;
