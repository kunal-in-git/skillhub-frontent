import React, { useEffect, useState } from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CiGlobe } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { PiCursorThin } from "react-icons/pi";
import { CiMobile1 } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";
import { BiSolidTv } from "react-icons/bi";
import MakePayment from '../../Pages/MakePayment';
import { apiConnector } from '../../services/apiconnector';
import { user } from '../../services/apis';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function CourseDetail() {

    const navigate = useNavigate();
    const [coursedetail, setdata] = useState(() => {
        const storedData = localStorage.getItem("coursedetail");
        return storedData ? JSON.parse(storedData) : null; // Handle null case
    });

    const [addtocart, setaddtocart] = useState(false)

    const [isenrolled, setenrolled] = useState(false);

    const isalreadyenrolled = async () => {
        try {
            const logindata = JSON.parse(localStorage.getItem('logindata'));
            const token = logindata.token;
            const userid = logindata._id;

            // Make the API call to check if the user is already enrolled
            const response = await apiConnector(
                "POST",
                user.ISALREADYENROLLED_API,
                {
                    userid: userid,
                    courseid: coursedetail._id
                },
                { Authorization: `Bearer ${token}` }
            );

            console.log("this is from already enrolled", response);
            setenrolled(true);
        } catch (error) {
            console.log("Error in checking enrolled course:", error.message);
        }
    };


    const addcourseincart = async () => {
        try {
            const courseid = coursedetail._id;
            const logindata = JSON.parse(localStorage.getItem('logindata'));

            if (!logindata) {
                console.error("Login data not found in localStorage");
                return;
            }

            const token = logindata.token;
            const userid = logindata._id;

            if (!userid || !courseid || !token) {
                console.error("Missing user ID, course ID, or token");
                return;
            }

            // Make API call
            const result = await apiConnector(
                'POST',
                user.ADDCOURSEINCART_API,
                { userid, courseid },
                { Authorization: `Bearer ${token}` }
            );

            // Check if API request was successful
            if (result?.data?.success) {
                console.log("Course added to cart successfully:", result.data);
                toast.success("Course is successfully added into cart")
                setaddtocart(true)
            } else {
                console.error("Failed to add course:", result?.data?.message || "Unknown error");
                alert(`Error: ${result?.data?.message || "Could not add course"}`);
            }
        } catch (error) {
            console.error("Error adding course to cart:", error);
            alert("Something went wrong. Please try again!");
        }
    };

    const [benefit, setbenefit] = useState(null);
    const [totalhrs, settotalhrs] = useState(null);
    const [totalmin, settotalmin] = useState(null);
    const [totallecture, settotallecture] = useState(null);
    const [sectiondetailarray, setsectiondetailarray] = useState([]);

    const caltotalduration = () => {
        let hrs = 0;
        let min = 0;
        let totallecture = 0;
        for (let i = 0; i < coursedetail?.coursecontent?.length; i++) {
            for (let j = 0; j < coursedetail?.coursecontent[i]?.subsection?.length; j++) {
                hrs += Number(coursedetail?.coursecontent[i]?.subsection[j]?.timeduration?.split(":")[0])
                min += Number(coursedetail?.coursecontent[i]?.subsection[j]?.timeduration?.split(":")[1])
                totallecture += 1;
            }
        }
        hrs = hrs + Math.floor(min / 60);
        min = min % 60;
        console.log("these is time duration", hrs, min);
        settotalhrs(hrs);
        settotalmin(min);
        settotallecture(totallecture);
    }

    const makesectionarray = () => {
        const array = [];
        let hrs = 0;
        let min = 0;
        for (let i = 0; i < coursedetail?.coursecontent?.length; i++) {
            for (let j = 0; j < coursedetail?.coursecontent[i]?.subsection?.length; j++) {
                hrs += Number(coursedetail?.coursecontent[i]?.subsection[j]?.timeduration?.split(":")[0])
                min += Number(coursedetail?.coursecontent[i]?.subsection[j]?.timeduration?.split(":")[1])
            }

            hrs = hrs + Math.floor(min / 60);
            min = min % 60;

            array[i] = {
                visibility: false,
                duration: `${hrs} h ${min} min`
            }
        }
        setsectiondetailarray(array);
    }

    useEffect(() => {
        if (!coursedetail) return;

        setbenefit(coursedetail?.benefits?.split("\n"));
        caltotalduration();
        makesectionarray();
        isalreadyenrolled();
    }, [coursedetail]);


    return (
        <>
            <ToastContainer />
            <div style={{ display: 'flex', justifyContent: 'center', width: '100vw', alignItems: 'flex-start', flexDirection: 'column' }}>

                <div style={{ background: 'rgb(0,8,20)', display: 'flex', justifyContent: "center", width: '100%', padding: '5%' }}>

                    <div
                        style={{
                            width: "60%",
                            margin: "0 auto",
                            padding: "20px",
                            borderRight: "1px solid #ffffff",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "30px",
                                fontWeight: "500",
                                color: "white",
                                marginBottom: "15px",
                            }}
                        >
                            {coursedetail?.coursename}
                        </div>

                        <div
                            style={{
                                fontSize: "16px",
                                color: "lightgrey",
                                marginBottom: "15px",
                                lineHeight: "1.5",
                            }}
                        >
                            {coursedetail?.description}
                        </div>

                        <div
                            style={{
                                color: "lightgrey",
                                fontSize: "14px",
                                marginBottom: "15px",
                            }}
                        >
                            <span style={{ marginRight: "10px" }}>⭐ {coursedetail?.avgrating}</span>
                            <span style={{ marginRight: "10px" }}>
                                👥 {coursedetail?.studentsenrolled?.length} students
                            </span>
                            <span>({coursedetail?.ratingandreviews?.length} ratings)</span>
                        </div>

                        <div
                            style={{
                                color: "grey",
                                fontWeight: "400",
                                fontSize: "14px",
                                marginBottom: "15px",
                            }}
                        >
                            Created by{" "}
                            <span style={{ fontWeight: "500", color: "white" }}>
                                {coursedetail?.instructor?.firstname} {coursedetail?.instructor?.lastname}
                            </span>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                color: "lightgrey",
                                fontSize: "14px",
                                gap: '5%'
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <IoIosInformationCircleOutline />
                                <span>Created on {coursedetail?.date.split("T")[0]}</span>
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                <CiGlobe />
                                <span>English</span>
                            </div>
                        </div>
                    </div>


                    <div
                        style={{
                            background: "rgb(23, 37, 58)",
                            marginBottom: "-28%",
                            marginRight: "8%",
                            borderRadius: "1em",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                            zIndex: '10'
                        }}
                    >
                        <div
                            style={{
                                width: "350px",
                                height: "200px",
                                borderRadius: "0.5em",
                                overflow: "hidden",
                                marginBottom: "20px",
                            }}
                        >
                            <img
                                src={coursedetail?.thumbnail}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                alt="thumbnail"
                            />
                        </div>

                        <div
                            style={{
                                fontSize: "30px",
                                fontWeight: "700",
                                color: "white",
                                marginBottom: "20px",
                                marginLeft: '5%'
                            }}
                        >
                            {coursedetail?.price}
                        </div>

                        {!isenrolled &&
                            !addtocart ? (
                            <button style={{
                                width: "80%",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "5px",
                                border: "none",
                                background: "#06D6A0",
                                color: "#fff",
                                fontWeight: "600",
                                cursor: "pointer",
                                margin: '3% auto'
                            }}
                                onClick={() => { addcourseincart() }}>
                                Add to Cart
                            </button>
                        ) : (
                            <button style={{
                                width: "80%",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "5px",
                                border: "none",
                                background: "rgb(255, 0, 0)",
                                color: "#fff",
                                fontWeight: "600",
                                cursor: "pointer",
                                margin: '3% auto'
                            }}
                                onClick={() => { navigate("/cart") }}
                            >
                                Go To Cart
                            </button>
                        )}

                        {!isenrolled ? (
                            <MakePayment courseid={coursedetail?._id} userid={JSON.parse(localStorage.getItem('logindata'))._id} isalreadyenrolled={isalreadyenrolled} prize={
                                coursedetail?.price
                                    ? parseInt(coursedetail.price.split("₹")[1]?.split(",").join("") || "0")
                                    : 0
                            } />) :
                            (
                                <div style={{
                                    width: "80%",
                                    padding: "10px",
                                    marginBottom: "20px",
                                    borderRadius: "5px",
                                    border: "none",
                                    background: "rgb(64, 0, 255)",
                                    color: "#fff",
                                    fontWeight: "600",
                                    margin: '3% auto',
                                    textAlign: 'center'
                                }}>
                                    Already Enrolled
                                </div>
                            )
                        }

                        <div
                            style={{
                                color: "grey",
                                fontSize: "14px",
                                marginBottom: "20px",
                                textAlign: 'center',
                            }}
                        >
                            30-Day Money-Back Guarantee
                        </div>

                        <ul
                            style={{
                                listStyleType: "none",
                                padding: "0",
                                color: "rgba(6, 214, 160, 1)",
                                fontSize: "16px",
                                marginLeft: '5%',
                                marginBottom: '10%'
                            }}
                        >
                            <li
                                style={{
                                    color: "white",
                                    fontWeight: "600",
                                    marginBottom: "10px",
                                }}
                            >
                                This course includes:
                            </li>

                            <li style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                <CiClock2 style={{ marginRight: "10px" }} />
                                <span>8 hours on-demand video</span>
                            </li>

                            <li style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                <PiCursorThin style={{ marginRight: "10px" }} />
                                <span>Full Lifetime access</span>
                            </li>

                            <li style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                <CiMobile1 style={{ marginRight: "10px" }} />
                                <span>Access on Mobile and TV</span>
                            </li>

                            <li style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                <CiBookmarkCheck style={{ marginRight: "10px" }} />
                                <span>Certificate of completion</span>
                            </li>
                        </ul>
                    </div>


                </div>

                <div style={{ background: 'rgba(22, 29, 41, 1)', width: '100%' }}>

                    <div
                        style={{
                            width: "50%",
                            marginLeft: "10%",
                            borderRadius: "10px",
                            marginTop: "3%"
                        }}
                    >
                        <ul style={{ listStyleType: "none", padding: "0" }}>
                            <li
                                style={{
                                    fontSize: "22px",
                                    fontWeight: "600",
                                    color: "rgba(6, 214, 160, 1)",
                                    marginBottom: "15px",
                                }}
                            >
                                ✅ What you'll learn
                            </li>
                            {benefit?.map((data, index) => (
                                <li
                                    key={index}
                                    style={{
                                        fontSize: "16px",
                                        color: "lightgrey",
                                        padding: "10px 0",
                                        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    {data}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        padding: "20px",
                        color: "white",
                        width: "70%",
                        margin: "5%",
                        marginLeft: '9%'
                    }}>
                        <div style={{
                            fontSize: "28px",
                            fontWeight: "600",
                            borderBottom: "2px solid #4ade80",
                            paddingBottom: "10px",
                            marginBottom: "15px"
                        }}>
                            Course Content
                        </div>

                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#374151",
                            padding: "10px 15px",
                            borderRadius: "8px"
                        }}>
                            <div style={{ fontSize: "16px", gap: "15px", display: "flex", alignItems: "center" }}>
                                <span>{coursedetail?.coursecontent.length} Sections</span>
                                <span>{totallecture} Lectures</span>
                                <span>{totalhrs}h {totalmin}m ( total length )</span>
                            </div>

                            <div style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                cursor: "pointer",
                                color: "#4ade80",
                                textDecoration: "underline"
                            }} onClick={() => {
                                setsectiondetailarray((prevArray) =>
                                    prevArray.map(item => ({
                                        ...item,
                                        visibility: false
                                    }))
                                );
                            }}>
                                Collapse All Sections
                            </div>
                        </div>

                        <div>
                            {
                                coursedetail?.coursecontent?.map((data, index) => (
                                    <>
                                        <div
                                            key={index}
                                            style={{
                                                width: '100%',
                                                background: 'rgb(0,8,20)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                borderRadius: '8px',
                                                padding: '16px',
                                                marginBottom: '12px',
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                color: 'white',
                                                gap: "1%"
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: '24px',
                                                    cursor: 'pointer',
                                                    marginRight: '12px',
                                                    color: 'rgb(6, 214, 160)',
                                                }}
                                                onClick={() => {
                                                    const updatedArray = [...sectiondetailarray];
                                                    updatedArray[index].visibility = !updatedArray[index].visibility;
                                                    setsectiondetailarray(updatedArray);
                                                }}
                                            >
                                                {sectiondetailarray[index]?.visibility ? "▼" : "▲"}
                                            </div>

                                            <div style={{ flex: 1, fontWeight: '600', fontSize: '18px' }}>
                                                {data.sectionname}
                                            </div>

                                            <div style={{ fontSize: '14px', color: 'grey' }}>
                                                {data.subsection?.length} Lectures
                                            </div>

                                            <div style={{ fontSize: '14px', color: 'grey' }}>
                                                {sectiondetailarray[index]?.duration}
                                            </div>
                                        </div>

                                        {sectiondetailarray[index]?.visibility && (
                                            <div style={{
                                                backgroundColor: 'rgb(10, 25, 40)',
                                                padding: '10px 20px',
                                                borderRadius: '8px',
                                                marginBottom: '12px',
                                                marginLeft: '20px',
                                            }}>
                                                {data.subsection?.map((subdata, subindex) => (
                                                    <div
                                                        key={subindex}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            padding: '10px 0',
                                                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                                        }}
                                                    >
                                                        <BiSolidTv style={{ color: 'rgb(6, 214, 160)', marginRight: '10px' }} />

                                                        <div style={{ flex: 1, color: 'white', fontSize: '16px' }}>
                                                            {subdata.title}
                                                        </div>

                                                        <div style={{ fontSize: '14px', color: 'grey' }}>
                                                            {subdata.timeduration.split(":")[0]} : {subdata.timeduration.split(":")[1]}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>

                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CourseDetail
