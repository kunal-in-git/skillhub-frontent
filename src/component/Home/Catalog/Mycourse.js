import React, { useEffect, useState } from 'react'
import Navigationbar from '../Navigationbar'
import { apiConnector } from '../../../services/apiconnector'
import { course } from '../../../services/apis'
import Smallbox from './Smallbox';
import Footer from '../Footer';
import BigBox from './BigBox';
import CourseDetail from '../../Dashboard/CourseDetail';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';

function Mycourse(props) {

    const [allcourse, setallcourse] = useState([]);
    const [mostsellingcourse, setmostsellingcourse] = useState([]);
    const [topratedcourse, settopratedcourse] = useState([]);
    const [detailofcourse, setcourse] = useState(null);
    const navigate = useNavigate();

    const settings = {
        dots: false,          // Disable pagination dots
        infinite: true,       // Infinite loop
        speed: 1000,          // Transition speed
        slidesToShow: 3,      // Show 3 slides at a time
        slidesToScroll: 1,    // Scroll one at a time
        autoplay: true,       // Enable autoplay
        autoplaySpeed: 2000,  // 2 seconds autoplay delay
        arrows: false,        // Remove left/right arrows
        responsive: [
            {
                breakpoint: 1024, // Tablets
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 600, // Mobile devices
                settings: { slidesToShow: 1 }
            }
        ]
    };

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const getallcourse = async () => {
        try {
            const logindata = JSON.parse(localStorage.getItem('logindata'));
            const token = logindata.token;
            const coursbycat = await apiConnector(
                "GET",
                `${course.COURSEBYCATEGORY_API}?categoryname=${props.categoryname}`,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );
            setallcourse(coursbycat.data.data.course);
            console.log("this is data of all course in a cat", coursbycat.data.data.course);
        } catch (error) {
            console.log("error in getting all course by cat", error.message);
        }
    }

    const getallmostsellingcourse = async () => {
        try {
            const logindata = JSON.parse(localStorage.getItem('logindata'));
            const token = logindata.token;
            const coursbycat = await apiConnector(
                "GET",
                `${course.MOSTSELLINGCOURSE_API}?categoryname=${props.categoryname}`,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );
            setmostsellingcourse(coursbycat.data.data.course);
            console.log("this is data from top courses", coursbycat.data.data.course);
        } catch (error) {
            console.log("error in getting all top course by cat", error.message);
        }
    }

    const gettopratedcourse = async () => {
        try {
            const logindata = JSON.parse(localStorage.getItem('logindata'));
            const token = logindata.token;
            const coursbycat = await apiConnector(
                "GET",
                `${course.TOPRATED_API}?categoryname=${props.categoryname}`,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );
            settopratedcourse(coursbycat.data.data.course);
            console.log("this is data from top courses", coursbycat.data.data.course);
        } catch (error) {
            console.log("error in getting all top course by cat", error.message);
        }
    }

    useEffect(() => {
        getallcourse()
        getallmostsellingcourse()
        gettopratedcourse()
    }, [])

    const showcoursedetail = (course) => {
        try {
            localStorage.setItem("coursedetail", JSON.stringify(course));
            setcourse(JSON.parse(localStorage.getItem("coursedetail")))
            navigate(`/catalog/${props.categoryname}/${course._id}`);

        } catch (error) {
            console.error("Error storing course detail:", error);
        }
    };
    console.log("This is by clicking course:", detailofcourse);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', borderBottom: '1px solid white', width: "100vw" }}>

                <Navigationbar />

                {/* {!detailofcourse ? ( */}
                {allcourse.length > 0 ? (
                    <div>
                        <div style={{ background: 'rgb(0,8,20)', display: 'flex', justifyContent: "flex-start", width: '100vw', alignItems: "center", gap: "5%", paddingTop: '2%', paddingBottom: '2%' }}>

                            <div style={{ width: "70%", paddingLeft: "10%" }}>
                                <div style={{ color: 'rgb(255, 255, 255)', fontSize: '30px', marginBottom: "1%" }}>
                                    Python
                                </div>
                                <div style={{ color: 'rgb(153,157,170)', fontSize: '14px' }}>
                                    Python is a general-purpose, versatile, and powerful programming language. It’s a great first language because Python code is concise and easy to read. Whatever you want to do, python can do it. From web development to machine learning to data science, Python is the language for you.
                                </div>
                            </div>

                            <div style={{ width: "30%" }}>
                                <div style={{ color: 'rgb(255, 255, 255)', marginBottom: "1%", fontSize: "18px" }}>Related resources</div>
                                <div>
                                    <ul style={{ listStyleType: 'circle', color: 'rgb(153,157,170)', fontSize: '14px' }}>
                                        <li>Doc Python</li>
                                        <li>Cheatsheets</li>
                                        <li>Articles</li>
                                        <li>Community Forums</li>
                                        <li>Projects</li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "100%", background: "rgb(22,29,41)" }}>

                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", background: "rgb(22,29,41)", padding: "3% 0" }}>
                                <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
                                    <h2 style={{ color: "white", fontSize: "30px", marginBottom: "20px" }}>Courses to Get You Started</h2>
                                    <Slider {...settings}>
                                        {allcourse.map((data, index) => (
                                            <div key={index} style={{ padding: "0 20px" }} onClick={() => { showcoursedetail(data) }}>
                                                <Smallbox
                                                    image={data.thumbnail}
                                                    description={`${data.description.substr(0, 40)} ...`}
                                                    name={data.coursename}
                                                    price={data.price}
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>


                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100%", background: "rgb(22,29,41)", padding: "3% 0" }}>
                                <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
                                    <h2 style={{ color: "white", fontSize: "30px", marginBottom: "20px" }}>Highest selling courses</h2>
                                    <Slider {...settings}>
                                        {mostsellingcourse.map((data, index) => (
                                            <div key={index} style={{ padding: "0 20px" }} onClick={() => { showcoursedetail(data) }}>
                                                <Smallbox
                                                    image={data.thumbnail}
                                                    description={`${data.description.substr(0, 40)} ...`}
                                                    name={data.coursename}
                                                    price={data.price}
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', width: '80%', fontWeight: "600", marginBottom: '5%' }}>
                                <div style={{ color: 'white', fontSize: "30px", margin: '8% 0 2% 0' }}>
                                    Top rated course
                                </div>
                                <div style={{ display: "flex", color: 'black', width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1.5em' }}>
                                        <div style={{ display: 'flex', gap: "5%" }}>
                                            <div onClick={() => { showcoursedetail(topratedcourse[0]) }}>
                                                <BigBox
                                                    image={topratedcourse[0]?.thumbnail}
                                                    description={`${topratedcourse[0]?.description.substr(0, 40)} ...`}
                                                    name={topratedcourse[0]?.coursename}
                                                    price={topratedcourse[0]?.price}
                                                />
                                            </div>
                                            <div onClick={() => { showcoursedetail(topratedcourse[1]) }}>
                                                <BigBox
                                                    image={topratedcourse[1]?.thumbnail}
                                                    description={`${topratedcourse[1]?.description.substr(0, 40)} ...`}
                                                    name={topratedcourse[1]?.coursename}
                                                    price={topratedcourse[1]?.price}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', gap: "5%" }}>
                                            <div onClick={() => { showcoursedetail(topratedcourse[2]) }}>
                                                <BigBox
                                                    image={topratedcourse[2]?.thumbnail}
                                                    description={`${topratedcourse[2]?.description.substr(0, 40)} ...`}
                                                    name={topratedcourse[2]?.coursename}
                                                    price={topratedcourse[2]?.price}
                                                />
                                            </div>
                                            <div onClick={() => { showcoursedetail(topratedcourse[3]) }}>
                                                <BigBox
                                                    image={topratedcourse[3]?.thumbnail}
                                                    description={`${topratedcourse[3]?.description.substr(0, 40)} ...`}
                                                    name={topratedcourse[3]?.coursename}
                                                    price={topratedcourse[3]?.price}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100vw',
                        height: '70vh',
                        background: 'linear-gradient(135deg, #0a0f1c, #1e2a3a)',
                        color: '#ffffff',
                        fontSize: '1.5rem',
                        fontFamily: 'Arial, sans-serif',
                        borderRadius: '12px',
                        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.5)',
                        padding: '20px',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '2rem',
                            marginBottom: '10px',
                            color: '#f5c518'
                        }}>😕</div>
                        <div style={{
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            marginBottom: '5px'
                        }}>Oops! No Courses Found</div>
                        <div style={{
                            fontSize: '1rem',
                            opacity: 0.7
                        }}>Please explore other categories or check back later.</div>
                    </div>

                )}
                {/* ) : <CourseDetail />} */}

            </div>

            <Footer />
        </>
    )
}

export default Mycourse
