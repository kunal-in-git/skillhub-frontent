import React from 'react'
import { PiNumberCircleOne } from "react-icons/pi";
import { PiNumberCircleTwo } from "react-icons/pi";
import { PiNumberCircleThree } from "react-icons/pi";
import Page1 from './ComponentOfCreateCourse.js/Page1';
import { useSelector, useDispatch } from "react-redux";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import Page2 from './ComponentOfCreateCourse.js/Page2.js'
import Page3 from './ComponentOfCreateCourse.js/Page3.js';

function CreateCourse() {
    const index = [
        {
            id: 1,
            title: "Course Information"
        },
        {
            id: 2,
            title: "Course Builder"
        },
        {
            id: 3,
            title: "Publish"
        }
    ];

    const pagenumber = useSelector((state) => state.Dashboard.page);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '85%', marginTop: '2%', padding: '1%', gap: '2%' }}>
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', width: '70%',
                flexDirection: 'column'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%', marginBottom: '5%' }}>
                    {index.map((data, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ fontSize: '2em', color: pagenumber === data.id ? 'yellow' : 'black' }}>
                                {data.id === 1 && (data.id < pagenumber ? <IoCheckmarkDoneCircleOutline style={{ background: "yellow", borderRadius: "1em" }} /> : <PiNumberCircleOne />)}
                                {data.id === 2 && (data.id < pagenumber ? <IoCheckmarkDoneCircleOutline style={{ background: "yellow", borderRadius: "1em" }} /> : <PiNumberCircleTwo />)}
                                {data.id === 3 && (data.id < pagenumber ? <IoCheckmarkDoneCircleOutline style={{ background: "yellow", borderRadius: "1em" }} /> : <PiNumberCircleThree />)}
                            </div>
                            <div style={{ color: pagenumber !== data.id ? 'rgb(94, 101, 116)' : 'white' }}>{data.title}</div>
                        </div>
                    ))}
                </div>
                <div style={{ width: '100%'}}>
                    { pagenumber === 1 && <Page1 />}
                    { pagenumber === 2 && <Page2 />}
                    { pagenumber === 3 && <Page3 />}   
                </div>
            </div>

            <div
                style={{
                    backgroundColor: "rgb(0, 8, 20)",
                    color: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    maxWidth: "400px",
                    width: '30%'
                }}
            >
                <h2 style={{ fontSize: "20px", fontWeight: "600", display: "flex", alignItems: "center" }}>
                    ⚡ Course Upload Tips
                </h2>
                <ul style={{ marginTop: "10px", paddingLeft: "20px", lineHeight: "1.6", color: "#ccc" }}>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024×576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important updates.</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    )
}

export default CreateCourse
