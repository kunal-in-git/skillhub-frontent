import React, { useEffect, useState } from 'react';
import { Line } from 'rc-progress';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { course } from '../../services/apis';
import { apiConnector } from '../../services/apiconnector';
import { useNavigate } from 'react-router-dom';

function EnrolledCourses() {
    const [courses, setcourse] = useState([]);
    const navigate = useNavigate();

    const getallenrolledcourse = async () => {
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
            console.log("This is my course", result);
            setcourse(result.data.data.courses || []);
        } catch (error) {
            console.log("Error fetching courses", error.message);
        }
    };

    useEffect(() => {
        getallenrolledcourse();
    }, []);

    return (
        <div style={{
            padding: '30px',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif',
            width: '100%'
        }}>
            <div style={{ width: "90%", margin: "auto", color: 'white' }}>
                <h2 style={{ marginBottom: '20px', fontSize: '28px', fontWeight: '600' }}>Enrolled Courses</h2>

                {courses.length === 0 ? (
                    <div style={{
                        marginTop: '60px',
                        textAlign: 'center',
                        color: 'rgba(219, 221, 234, 0.9)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '20px'
                    }}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                            alt="No Course Illustration"
                            style={{
                                width: '120px',
                                opacity: 0.8,
                                animation: 'float 2s ease-in-out infinite'
                            }}
                        />

                        <h3 style={{ fontSize: '22px', fontWeight: 600, margin: 0 }}>
                            No Enrollments Yet
                        </h3>

                        <p style={{
                            fontSize: '16px',
                            color: 'rgba(219, 221, 234, 0.7)',
                            margin: 0
                        }}>
                            You haven’t enrolled in any courses yet. Explore our collection and start learning!
                        </p>

                        {/* Floating Animation Keyframe */}
                        <style>{`
                          @keyframes float {
                            0% { transform: translateY(0); }
                            50% { transform: translateY(-8px); }
                            100% { transform: translateY(0); }
                          }
                        `}</style>
                    </div>


                ) : (
                    <Table style={{ width: '100%', borderCollapse: 'collapse', border: "rgb(0,8,20)" }}>
                        <Thead>
                            <Tr style={{ backgroundColor: 'rgb(0,8,20)', height: '50px' }}>
                                <Td style={{ padding: '10px', fontWeight: 'bold', color: '#ffffff' }}>Course Name</Td>
                                <Td style={{ padding: '10px', fontWeight: 'bold', color: '#ffffff' }}>Progress</Td>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {courses.map((data, index) => {
                                return (
                                    <Tr key={index} style={{ borderBottom: '1px solid rgb(0,8,20)', cursor: 'pointer' }} onClick={() => { navigate(`/EnrolledCourses/${data._id}`) }}>
                                        <Td style={{ display: 'flex', alignItems: 'center', padding: '15px 10px', gap: '15px' }}>
                                            <img
                                                src={data.thumbnail}
                                                alt='thumbnail'
                                                style={{ width: '80px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                                            />
                                            <div>
                                                <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '16px' }}>
                                                    {data.coursename}
                                                </div>
                                            </div>
                                        </Td>
                                        <Td style={{ padding: '15px 10px', width: '30%' }}>
                                            <div style={{ position: 'relative' }}>
                                                {
                                                    (() => {
                                                        const totalSubsections = data.coursecontent.reduce((total, section) => total + section.subsection.length, 0);
                                                        const completedSubsections = data.coursecontent.reduce(
                                                            (total, section) =>
                                                                total + section.subsection.filter(sub => sub.completed).length,
                                                            0
                                                        );

                                                        const percent = totalSubsections === 0 ? 0 : Math.round((completedSubsections / totalSubsections) * 100);

                                                        return (
                                                            <>
                                                                <Line
                                                                    percent={percent}
                                                                    strokeWidth={6}
                                                                    strokeColor="#00C853"
                                                                    trailWidth={6}
                                                                    trailColor="#2c3e50"
                                                                    style={{ borderRadius: '4px' }}
                                                                />
                                                                <span style={{
                                                                    position: 'absolute',
                                                                    right: 0,
                                                                    top: '-22px',
                                                                    fontSize: '14px',
                                                                    color: '#00C853',
                                                                    fontWeight: 'bold'
                                                                }}>
                                                                    {percent}%
                                                                </span>
                                                            </>
                                                        );
                                                    })()
                                                }
                                            </div>
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                )}
            </div>
        </div>
    );
}

export default EnrolledCourses;
