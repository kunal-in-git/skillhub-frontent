import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { course } from '../../services/apis.js';
import { apiConnector } from '../../services/apiconnector.js';
import Ratingandreviewsmallbox from './Ratingandreviewsmallbox.js';

function ReviewSlider() {

    const [reviews, setReviews] = useState([]);

    const allreview = async () => {
        try {
            const logindata = JSON.parse(localStorage.getItem('logindata'));
            const token = logindata?.token;

            const result = await apiConnector(
                "GET",
                `${course.GETALLREVIEW_API}`,
                null,
            );
            console.log("this is result", result)
            setReviews(result.data.data); // or adjust depending on your actual response
        } catch (error) {
            console.error("Error fetching reviews:", error.message);
        }
    };

    useEffect(() => {
        allreview();
        console.log("this is data of review", reviews)
    }, [])

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

    return (
        <div>
            <Slider {...settings}>
                {reviews?.map((data, index) => (
                    <div key={index}>
                        <Ratingandreviewsmallbox image={data?.user?.image} firstname={data?.user?.firstname} lastname={data?.user?.lastname} email={data?.user?.email} review={`${data?.review.substr(0.100)}...`} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default ReviewSlider
