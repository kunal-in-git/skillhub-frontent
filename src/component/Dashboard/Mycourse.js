import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { apiConnector } from '../../services/apiconnector';
import { course } from '../../services/apis';
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setvalue } from '../../slices/Editingcourse';

function Mycourse() {
    const [coursedata, setcourse] = useState([]);
    const [durationarray, setdurationdurationarray] = useState([]);
    const navigate = useNavigate();

    const dispatch = useDispatch()
    const isediting = useSelector((state) => state.isediting.value);

    const deletecourse = async (index) => {
        try {
            // Remove course from local state optimistically
            setcourse(coursedata.filter((_, i) => i !== index));

            const logindata = JSON.parse(localStorage.getItem('logindata'));
            const token = logindata.token;

            // API Call
            const result = await apiConnector("DELETE", course.COURSEDELETION_API,
                { courseid: coursedata[index]._id },
                { Authorization: `Bearer ${token}` }
            );

            console.log("Course deleted successfully", result);
            alert("Course deleted successfully");
        } catch (error) {
            console.error("Error deleting course", error);
            alert("Failed to delete course. Try again.");
            // Revert optimistic update if deletion fails
            setcourse([...coursedata]);
        }
    };

    const editcourse = async (index) => {
        try {

            // get the course details and save in local storage so to pass in the form for future use

            const logindata = JSON.parse(localStorage.getItem('logindata'));
            const token = logindata.token;

            const result = await apiConnector(
                "GET",
                `${course.COURSEBYCOURSID_API}?courseid=${coursedata[index]._id}`,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );
            dispatch(setvalue());
            localStorage.setItem("coursedata_for_edit", JSON.stringify(result.data.data))
            console.log("this is my course for editing", result);
            navigate("/user/Dashboard/create-course")
        } catch (error) {
            console.log("Unable to fetch course data:", error.message);
        }
    }


    // Fetch courses
    const fetchcourse = async () => {
        try {
            const logindata = JSON.parse(localStorage.getItem('logindata'));
            const token = logindata.token;

            const result = await apiConnector(
                "GET",
                `${course.GETALLCOURSEBYUSERID_API}?userId=${logindata._id}`,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );
            console.log("thsi is my course", result);
            setcourse(result.data.data.courses);
        } catch (error) {
            console.log("Unable to fetch course data:", error.message);
        }
    };

    // Calculate duration
    const makesectiondurationarray = () => {
        const arr = coursedata.map((course) => {
            let hrs = 0;
            let min = 0;
            course.coursecontent.forEach(section => {
                section.subsection.forEach(sub => {
                    hrs += Number(sub.timeduration.split(":")[0]);
                    min += Number(sub.timeduration.split(":")[1]);
                });
            });

            hrs += Math.floor(min / 60);
            min %= 60;

            return { duration: `${hrs} h ${min} min` };
        });

        setdurationdurationarray(arr);
    };

    useEffect(() => {
        fetchcourse();
    }, []);

    useEffect(() => {
        if (coursedata.length) makesectiondurationarray();
    }, [coursedata]);

    return (
        coursedata?.length === 0 ? (
            <div style={{
                height: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                textAlign: 'center',
                color: 'rgba(219, 221, 234, 0.9)',
                gap: '20px',
                animation: 'fadeIn 1s ease-in-out',
                backgroundColor: 'rgb(22, 29, 41)' // Optional: if you want a darker background
            }}>
                <style>
                    {`
                    @keyframes float {
                      0% { transform: translatey(0px); }
                      50% { transform: translatey(-10px); }
                      100% { transform: translatey(0px); }
                    }
            
                    @keyframes fadeIn {
                      0% { opacity: 0; transform: translateY(20px); }
                      100% { opacity: 1; transform: translateY(0); }
                    }
                  `}
                </style>

                <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                    alt="No Courses Illustration"
                    style={{
                        width: '120px',
                        opacity: 0.85,
                        animation: 'float 2.5s ease-in-out infinite',
                    }}
                />

                <h3 style={{ fontSize: '22px', fontWeight: 600, margin: 0 }}>
                    No Courses Available
                </h3>

                <p style={{
                    fontSize: '16px',
                    color: 'rgba(219, 221, 234, 0.7)',
                    maxWidth: '320px',
                    margin: 0,
                    lineHeight: 1.5
                }}>
                    You haven’t enrolled in any courses yet. Browse our catalog and start learning something amazing today!
                </p>
            </div>

        ) : (
            <div style={{ padding: '20px', backgroundColor: '#2C333F', color: '#ffffff', minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: "center", marginTop: '2%' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', marginBottom: '2%' }}>
                    <div style={{ fontSize: '30px', fontWeight: "540" }}>
                        My Course
                    </div>
                    <button style={{ padding: "1%", background: "yellow" }} onClick={() => { navigate("/user/Dashboard/create-course") }}>
                        Add
                    </button>
                </div>

                <Table style={{ width: '80%', borderCollapse: 'collapse', border: '1px solid #444' }}>
                    <Thead>
                        <Tr>
                            <Th style={{ padding: '12px 16px', border: '1px solid #444', textAlign: 'left' }}>COURSES</Th>
                            <Th style={{ padding: '12px 16px', border: '1px solid #444', textAlign: 'left' }}>DURATION</Th>
                            <Th style={{ padding: '12px 16px', border: '1px solid #444', textAlign: 'left' }}>PRICE</Th>
                            <Th style={{ padding: '12px 16px', border: '1px solid #444', textAlign: 'left' }}>ACTIONS</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {coursedata.map((data, index) => (
                            <Tr key={index} style={{ color: 'gray', width: '100%' }}>
                                <Td style={{ padding: '12px 16px', display: 'flex', gap: '20px', width: '100%', justifyContent: 'flex-start' }}>

                                    <div style={{ width: "40%", borderRadius: "5%" }}>
                                        <img src={data.thumbnail} alt="course" style={{ width: '100%', height: '100%', borderRadius: "5%" }} />
                                    </div>

                                    <div style={{ width: '100%' }}>
                                        <div style={{ fontSize: '20px', color: 'white', fontWeight: '500', margin: '0 0 2% 0' }}>{data.coursename}</div>
                                        <div style={{ fontSize: '14px', margin: '0 0 2% 0' }}>{data.description}</div>
                                        <div style={{ fontSize: '12px', color: '#DBDDBA', margin: '0 0 2% 0' }}>
                                            Created: {new Date(data.date).toLocaleDateString()} | {new Date(data.date).toLocaleTimeString()}
                                        </div>
                                        <div style={{
                                            fontSize: '12px',
                                            padding: '1%',
                                            borderRadius: '1em',
                                            textTransform: 'uppercase',
                                            background: 'rgb(69, 72, 76)',
                                            color: data?.status === "Publish" ? 'yellow' : 'pink',
                                            width: '15%',
                                            textAlign: 'center',
                                            fontWeight: '500',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '5%'
                                        }}>
                                            <div>
                                                {data?.status === "Publish" ? <CiCircleCheck style={{ strokeWidth: 2 }} /> : <CiClock2 style={{ strokeWidth: 2 }} />}
                                            </div>
                                            <div>
                                                {data.status.toUpperCase()}
                                            </div>
                                        </div>
                                    </div>
                                </Td>

                                <Td style={{ padding: '12px 16px', fontSize: '14px', color: '#DBDDBA', textAlign: 'center' }}>{durationarray[index]?.duration}</Td>

                                <Td style={{ padding: '12px 16px', fontSize: '14px', color: '#DBDDBA', textAlign: 'center' }}>{data.price}</Td>

                                <Td style={{ padding: '12px 16px', textAlign: 'center' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', gap: '15%' }}>
                                        <GoPencil style={{ fontSize: '20px', cursor: 'pointer', color: '#4ade80' }} onClick={() => { editcourse(index) }} />
                                        <MdDeleteOutline style={{ fontSize: '20px', cursor: 'pointer', color: '#ff5252' }} onClick={() => { deletecourse(index) }} />
                                    </div>
                                </Td>

                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </div>
        )
    );

}

export default Mycourse
