import React, { useEffect } from 'react';
import Profile from '../component/Dashboard/Profile.js';
import Navigationbar from '../component/Home/Navigationbar.js';
import Leftpart from '../component/Dashboard/Leftpart';
import Setting from '../component/Dashboard/Setting.js';
import CreateCourse from '../component/Dashboard/CreateCourse.js';
import EnrolledCourses from '../component/Dashboard/EnrolledCourses.js';
import { useLocation, useNavigate } from "react-router-dom";
import Mycourse from '../component/Dashboard/Mycourse.js';
import Instructordata from '../component/Dashboard/Instructordata.js';

function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const lastValue = location.pathname.split("/").pop();

    // Redirect to Profile by default on Dashboard load
    useEffect(() => {
        if (location.pathname === "/user/Dashboard") {
            navigate("/user/Dashboard/profile");
        }
    }, [location, navigate]);

    // Component Rendering based on Route
    const renderComponent = () => {
        switch (lastValue) {
            case "profile":
                return <Profile />;
            case "settings":
                return <Setting />;
            case "EnrolledCourses":
                return <EnrolledCourses />;
            case "create-course":
                return <CreateCourse />;
            case "Mycourse":
                return <Mycourse />
            case "Instructordata":
                return <Instructordata />
            default:
                return <Profile />; // Fallback to Profile
        }
    };

    return (
        <div style={{ background: 'rgb(44,51,63)' }}>
            <Navigationbar />
            <div style={{ display: 'flex', width: '100%' }}>
                <Leftpart location={lastValue} />
                {renderComponent()}
            </div>
        </div>
    );
}

export default Dashboard;
