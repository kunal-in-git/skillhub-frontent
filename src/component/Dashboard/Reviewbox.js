import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { apiConnector } from '../../services/apiconnector';
import { course } from '../../services/apis';
import { useParams } from 'react-router-dom';

function Reviewbox(props) {
    const [rating, setRating] = useState(0);
    const [review, setreview] = useState("");
    const [logindata, setlogindata] = useState(() => {
        try {
            const storedData = localStorage.getItem('logindata');
            return storedData ? JSON.parse(storedData) : null;
        } catch (error) {
            console.error("Error parsing logindata from localStorage:", error);
            return null;
        }
    });

    const { courseId } = useParams()

    const handleRating = (rate) => {
        setRating(rate);
        console.log("this is rating", rate);
    };

    const submitreview = async () => {
        try {
            if (!rating || !review.trim()) {
                alert("Please add a rating and review before submitting.");
                return;
            }

            const result = await apiConnector(
                "POST",
                course.CREATERATING_API,
                {
                    userid: logindata._id,
                    rating: rating,
                    review: review,
                    courseid: courseId
                },
                {
                    Authorization: `Bearer ${logindata.token}`
                }
            );

            console.log("✅ Review submitted:", result);

            // Optional: Close review box and reset states
            props.setreviewbox(false);
            window.location.reload()
            setRating(0);
            setreview("");

            // Optional: Show a toast or alert
            alert("Thanks for your review!");

        } catch (error) {
            console.error("❌ Error submitting review:", error.message);
            alert("Failed to submit review. Please try again later.");
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw',
            height: '100vh',
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                backgroundColor: '#121212',
                padding: '30px',
                borderRadius: '12px',
                width: '500px',
                maxWidth: '90%',
                boxShadow: '0 0 25px rgba(0, 255, 255, 0.4)',
                color: '#ffffff',
                position: 'relative',
            }}>
                {/* Close Button */}
                <button
                    onClick={() => props.setreviewbox(false)}
                    style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        fontSize: '20px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        color: '#fff',
                        transition: '0.3s',
                        padding: '6px',
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'red';
                        e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#fff';
                    }}
                >
                    ✕
                </button>

                {/* User Info */}
                {logindata && (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <img
                            src={logindata.image}
                            alt="user"
                            style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '12px' }}
                        />
                        <div>
                            <div style={{ fontWeight: 'bold', color: '#00FFE0' }}>
                                {`${logindata.firstname} ${logindata.lastname}`}
                            </div>
                            <div style={{ fontSize: '12px', color: '#aaa' }}>
                                Posting Publicly
                            </div>
                        </div>
                    </div>
                )}

                {/* Star Rating */}
                <div style={{ marginBottom: '15px' }}>
                    <Rating onClick={handleRating} />
                </div>

                {/* Review Textarea */}
                <div style={{ marginBottom: '10px', fontWeight: 'bold', color: '#0ff' }}>Add your experience</div>
                <textarea
                    placeholder="Write your review here..."
                    rows={5}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #444',
                        backgroundColor: '#1e1e1e',
                        color: '#fff',
                        resize: 'none'
                    }}
                    onChange={(e) => { setreview(e.target.value) }}
                />

                {/* Submit Button */}
                <div style={{ marginTop: '20px', textAlign: 'right' }}>
                    <button
                        style={{
                            padding: '10px 24px',
                            backgroundColor: '#00FFE0',
                            color: '#000',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: '0.2s ease-in-out'
                        }}
                        onClick={() => { submitreview() }}
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Reviewbox;
