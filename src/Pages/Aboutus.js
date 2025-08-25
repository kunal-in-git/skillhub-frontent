import React from "react";
import HighlightText from "../component/Home/HighlightText.js";
import aboutus1 from '../assets/Images/aboutus1.webp'
import aboutus2 from '../assets/Images/aboutus2.webp'
import aboutus3 from '../assets/Images/aboutus3.webp'
import Navigationbar from '../component/Home/Navigationbar.js'
import foundingstory from '../assets/Images/FoundingStory.png'
import NumberHeading from '../component/aboutus/NumberHeading.js'
import SmallColorBox from "../component/aboutus/SmallColorBox.js";
import Footer from "../component/Home/Footer.js";

function Aboutus() {
    return (
        <div >
            <div>
                <Navigationbar />
            </div>
            <div style={{
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                background: "rgba(22, 29, 41, 1)", height:'100vh'
            }} >

                <div style={{ fontSize: "16px", color: "rgba(153, 157, 170, 1)", marginTop: '5%' }} >
                    About us
                </div>

                <div style={{ fontSize: "36px", color: "white", width: '50%', textAlign: 'center', marginTop: '3%' }} >
                    Driving Innovation in Online Educationfor a <HighlightText color="rgb(0, 255, 255)" text="Brighter Future " />
                </div>

                <div style={{
                    fontSize: "16px", color: "rgba(153, 157, 170, 1)", width: '55%', textAlign: 'center',
                    marginTop: '1.5%'
                }} >
                    Skill Hub is at the forefront of driving innovation in online education.We 're passionate about creating a brighter future by
                    offering cutting - edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </div>

                <div style={{ display: 'flex', marginTop: '5%', gap: '2%', justifyContent: 'center', alignItems: 'center', marginBottom: '-7%' }}>
                    <div>
                        <img src={aboutus1} alt="aboutus1"></img>
                    </div>
                    <div>
                        <img src={aboutus2} alt="aboutus2"></img>
                    </div>
                    <div>
                        <img src={aboutus3} alt="aboutus3"></img>
                    </div>
                </div>
            </div>

            <div style={{
                background: 'rgba(0, 8, 20, 1)', display: 'flex', justifyContent: 'center', alignItems: 'center',
                borderBottom: '1px solid rgba(44, 51, 63, 1)'
            }}>
                <div style={{
                    fontSize: '36px', width: '80%', textAlign: 'center', color: 'rgba(175, 178, 191, 1)', marginTop: '12%'
                    , marginBottom: '5%'
                }}>
                    We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText color="rgb(0, 255, 255)" text="combines technology" /> , <HighlightText color="rgb(255,81,47)" text="expertise" />, and community to create an <HighlightText color="rgb(249,212,35)" text="unparalleled educational experience." />
                </div>
            </div>

            <div style={{ background: 'rgba(0, 8, 20, 1)', display: 'flex', gap: '10%', justifyContent: 'center', alignItems: 'center' }}>

                <div style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '30%'
                    , marginTop: '10%'
                }}>
                    <div style={{
                        backgroundImage: 'linear-gradient(117.95deg, #833AB4 -2.4%, #FD1D1D 52.25%, #FCB045 106.89%)',
                        color: 'transparent', backgroundClip: 'text', marginBottom: '3%', fontSize: '36px'
                    }}>
                        Our Founding Story
                    </div>
                    <div style={{ color: 'rgba(131, 136, 148, 1)', marginBottom: '3%' }}>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </div>
                    <div style={{ color: 'rgba(131, 136, 148, 1)' }}>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                    </div>
                </div>

                <div style={{ width: '25%', marginTop: '10%' }}>
                    <img style={{ width: '100%', height: '100%' }} src={foundingstory} alt="foundingstory"></img>
                </div>

            </div>

            <div style={{ background: 'rgba(0, 8, 20, 1)', display: 'flex', gap: '10%', justifyContent: 'center', alignItems: 'center' }}>

                <div style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '30%'
                    , marginTop: '10%', marginLeft: '6%', marginBottom: '5%'
                }}>
                    <div style={{ fontSize: '36px' }}>
                        <HighlightText color="rgb(249,212,35)" text="Our Vision" />
                    </div>

                    <div style={{ color: 'rgba(131, 136, 148, 1)', marginBottom: '3%' }}>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                    </div>
                </div>

                <div style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '30%'
                    , marginTop: '10%', marginBottom: '5%'
                }}>
                    <div style={{ fontSize: '36px' }}>
                        <HighlightText color="rgb(0, 255, 255)" text="Our Mission" />
                    </div>

                    <div style={{ color: 'rgba(131, 136, 148, 1)', marginBottom: '3%' }}>
                        our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                    </div>
                </div>

            </div>

            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(22, 29, 41, 1)',
                gap: '15%', padding: '3% 0 3% 0'
            }}>
                <div>
                    <NumberHeading number="5K" heading="Active Students" />
                </div>
                <div>
                    <NumberHeading number="10+" heading="Mentors" />
                </div>
                <div>
                    <NumberHeading number="200+" heading="Courses" />
                </div>
                <div>
                    <NumberHeading number="50+" heading="Awards" />
                </div>
            </div>

            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
                background: 'rgba(0, 8, 20, 1)'
            }}>

                <div style={{ display: 'flex', justifyContent: 'center', width: '70%', marginTop: '10%' }}>

                    <div style={{ width: '50%' }}>
                        <div style={{ fontSize: '36px', color: 'rgb(241,242, 255)' }}>
                            World-Class Learning for
                        </div>
                        <div style={{
                            backgroundImage: 'linear-gradient(117.52deg, #5433FF -4%, #20BDFF 51.26%, #A5FECB 106.52%)',
                            color: 'transparent', backgroundClip: 'text', fontSize: '36px', marginBottom: '2%'
                        }}>
                            Anyone, Anywhere
                        </div>
                        <div style={{ color: 'rgba(131, 136, 148, 1)', marginBottom: '5%' }}>
                            Skill Hub partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.
                        </div>
                        <div style={{ marginBottom: '2%' }}>
                            <button style={{padding:"2%"}}>Learn More</button>
                        </div>
                    </div>

                    <SmallColorBox color='rgba(44, 51, 63, 1)' heading='Curriculum Based on Industry Needs'
                        content='Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.'
                    />

                    <SmallColorBox color='rgba(22, 29, 41, 1)' heading='Our Learning Methods'
                        content='The learning process uses the namely online and offline.'
                    />

                </div>

                <div style={{ display: 'flex', justifyContent: 'center', width: '70%', marginBottom:"10%" }}>

                    <SmallColorBox color='rgba(22, 29, 41, 1)'
                    />

                    <SmallColorBox color='rgba(44, 51, 63, 1)' heading='Certification'
                        content='You will get a certificate that can be used as a certification during job hunting.'
                    />

                    <SmallColorBox color='rgba(22, 29, 41, 1)' heading='Ready to Work'
                        content='Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.'
                    />

                    <SmallColorBox color='rgba(44, 51, 63, 1)' heading='Rating "Auto-grading"'
                        content='You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.'
                    />

                </div>

            </div>

            <Footer></Footer>

        </div>
    );
}

export default Aboutus;