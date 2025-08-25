import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import "./Home.css"
import { NavLink } from 'react-router-dom';
import HighlightText from '../component/Home/HighlightText';
import banner from "../assets/Images/banner.mp4" // video file
import Typeanimation from '../component/Home/Typeanimation';
import Leftgirlpart from '../component/Home/Leftgirlpart';
import TimelineImage from '../assets/Images/TimelineImage.png' // Image File
import Compare_with_others from '../assets/Images/Compare_with_others.png' // Image File
import Know_your_progress from '../assets/Images/Know_your_progress.svg' // Image File
import Plan_your_lessons from '../assets/Images/Plan_your_lessons.png' // Image File
import Instructor from '../assets/Images/Instructor.png'
import Footer from '../component/Home/Footer';
import Navigationbar from '../component/Home/Navigationbar.js'
import ReviewSlider from '../component/Home/ReviewSlider.js';
import Mycourse from '../component/Home/Catalog/Mycourse.js';

function Home() {
    return (
        <div>
            {/* navigation bar */}
            <Navigationbar />
            {/* section 1 */}
            <div id='home_section1'>

                <div id='home_section1_div1' style={{ 'paddingTop': '10%', width: '60%' }}>
                    <div id='home_section1_div11'>
                        <div>Become an Instructor &nbsp; </div>
                        <FaArrowRight style={{ color: "rgb(128, 145, 169)" }} />
                    </div>
                    <div id='home_section1_div12'>
                        Empower Your Future with <HighlightText color="rgb(0, 255, 255)" text="coding skills" />
                    </div>

                    <div id='home_section1_div13'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </div>

                    <div id='home_section1_div14' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5%' }}>
                        <button style={{ padding: "5%" }}>
                            Learn More &nbsp; <FaArrowRight style={{ color: "black" }} />
                        </button>
                        <button style={{ padding: "5%" }}>
                            Book a Demo
                        </button>
                    </div>
                </div>


                <div id='home_section1_div2'>
                    <video autoPlay muted loop style={{ width: '50%', 'boxShadow': '8px 8px white', 'zIndex': '1' }}>
                        <source src={banner} type='video/mp4'></source>
                    </video>
                </div>

                <div id='home_section1_div3'>

                    <div id='home_section1_div31' style={{ width: '33%', margin: '5%' }}>
                        <div style={{ 'fontSize': "36px", 'textAlign': 'left' }}>
                            Unlock your <HighlightText color="rgb(0, 255, 255)" text="coding potential" /> with our online courses.
                        </div>

                        <div style={{ 'fontSize': "16px", 'textAlign': 'left', 'color': "rgb(200, 200, 200)", 'marginTop': '2%' }}>Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you</div>

                        <div id="home_section1_div313">
                            <button style={{ padding: '1%' }}>
                                Try it Youself &nbsp; <FaArrowRight style={{ color: "black" }} />
                            </button>
                            <button style={{ padding: '1%' }}>
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div id='home_section1_div32' style={{ width: '400px', margin: '5%' }}>
                        <Typeanimation></Typeanimation>
                    </div>

                </div>

                <div id='home_section1_div4'>

                    <div id='home_section1_div41' style={{ width: '400px', margin: '5%' }}>
                        <Typeanimation></Typeanimation>
                    </div>

                    <div id='home_section1_div42' style={{ width: '33%', margin: '5%' }}>
                        <div style={{ 'fontSize': "36px", 'textAlign': 'left' }}>
                            Start <HighlightText color="rgb(0, 255, 255)" text="coding in seconds" />
                        </div>

                        <div style={{ 'fontSize': "16px", 'textAlign': 'left', 'color': "rgb(200, 200, 200)", 'marginTop': '2%' }}>Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.</div>

                        <div id="home_section1_div423">
                            <button style={{ padding: '1%' }}>
                                Continue Lesson &nbsp; <FaArrowRight style={{ color: "black" }} />
                            </button>
                            <button style={{ padding: '1%' }}>
                                Learn More
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            {/* section 2 */}

            <div id='home_section2'>
                <div id='home_section2_div1'>
                    <button style={{ padding: '1%', background:'rgb(0, 255, 255)' }}>
                        Explore Full Catalog&nbsp; <FaArrowRight style={{ color: "black" }} />
                    </button>
                </div>
            </div>

            <div id='home_section2_div2'>
                <div style={{ 'fontSize': "36px", 'textAlign': 'left' }}>
                    Get the skills you need for a <HighlightText color="rgb(0, 255, 255)" text="job that is in demand." />
                </div>
                <div style={{ display: 'flex', 'flexDirection': 'column', justifyContent: 'center', 'alignItems': 'flex-start', gap: '2em' }}>
                    <p>The modern Skill Hub is the dictates its own terms. Today, to be a competitive specialist requires more than
                        professional skills</p>
                    <button>
                        Learn More
                    </button>
                </div>
            </div>

            <div id='home_section2_div3'>

                <div id='home_section2_div31'>
                    <Leftgirlpart />
                </div>

                <div id='home_section2_div32' style={{ position: 'relative' }}>
                    <img src={TimelineImage} alt='girl' style={{ height: '30em' }}></img>

                    <div style={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(1, 74, 50)',
                        width: '70%', position: 'absolute', bottom: '-5%', left: '15%'
                    }}>

                        <div style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10%',
                            width: '100%', margin: '3% 0%', 'borderRight': '2px solid white'
                        }}>
                            <div style={{ fontSize: '36px', color: 'white', padding: '5%' }}>10</div>
                            <div style={{ color: 'rgba(5, 167, 123)' }}>YEARS EXPERIENCES</div>
                        </div>

                        <div style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10%',
                            width: '100%', margin: '3% 0%'
                        }}>
                            <div style={{ fontSize: '36px', color: 'white', padding: '5%' }}>250</div>
                            <div style={{ color: 'rgba(5, 167, 123)' }}>TYPES OF COURSES</div>
                        </div>

                    </div>
                </div>
            </div>

            {/* section 3 */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '50%' }}>
                    <div style={{ fontSize: '36px', marginBottom: '1%' }}>
                        Your swiss knife for <HighlightText color="rgb(0, 255, 255)" text="learning any language" />
                    </div>
                    <div>
                        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                    </div>
                </div>
                <div style={{ width: '70%', display: 'flex', marginTop: '2%' }}>
                    <img src={Know_your_progress} alt='tiltImage' style={{ width: '40%' }}></img>
                    <img src={Compare_with_others} alt='tiltImage' style={{ width: '40%', marginLeft: '-10%' }}></img>
                    <img src={Plan_your_lessons} alt='tiltImage' style={{ width: '40%', marginLeft: '-12%' }}></img>
                </div>
            </div>

            {/* section 4 */}
            <div id='home_section4' style={{ backgroundColor: 'rgb(0, 9, 23)' }}>

                <div id="home_section4_div1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    <div id="home_section4_div11" style={{
                        width: '100%', display: 'flex', alignItems: 'center',
                        justifyContent: 'flex-end'
                    }}>
                        <img src={Instructor} alt='Instructor' style={{ width: '60%', boxShadow: '-10px -10px white' }}></img>
                    </div>

                    <div style={{ width: '100%', padding: '10%' }}>
                        <div style={{ fontSize: '36px' }}>
                            <p style={{ color: 'white' }}>Become an </p><HighlightText color="rgb(0, 255, 255)" text="instructor" />
                        </div>
                        <br></br>
                        <div style={{ color: 'rgba(131, 136, 148)' }}>
                            Instructors from around the world teach millions of students on Skill Hub. We provide the tools and skills to teach what you love.
                        </div>
                        <br></br>
                        <br></br>
                        <div>
                            <button style={{ padding: '1%' }}>
                                Start Teaching Today
                            </button>
                        </div>
                    </div>

                </div>

                <div>
                    <div style={{
                        padding: '2rem 1rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: 'white',
                            marginBottom: '5%',
                            textAlign: 'center',
                            fontFamily: 'sans-serif'
                        }}>
                            Reviews from other learners
                        </div>
                        <div>
                            <ReviewSlider />
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
