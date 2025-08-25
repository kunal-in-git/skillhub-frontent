import React, { useEffect, useState } from 'react';
import { apiConnector } from '../../services/apiconnector';
import { course } from '../../services/apis';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Reviewbox from './Reviewbox';

function Viewcourse() {
  const [coursedata, setCourseData] = useState(null);
  const [subsectionVideo, setSubsectionVideo] = useState(null);
  const [subsectionId, setSubsectionId] = useState();
  const { courseId } = useParams();
  const [showreviewbox, setreviewbox] = useState(false)

  const [alreadyreviewed, setalreadyreviewed] = useState(false);

  useEffect(() => {
    try {
      const logindata = JSON.parse(localStorage.getItem('logindata'));
      const userId = logindata?._id;

      const isReviewed = coursedata?.ratingandreviews?.some(
        (review) => review.user === userId
      );

      setalreadyreviewed(isReviewed);
    } catch (error) {
      console.error("Error in alreadyreviewed logic:", error);
      setalreadyreviewed(false);
    }
  }, [coursedata]);


  console.log("this is alreadyreview", alreadyreviewed);

  const markDoneVideo = async () => {
    try {
      const loginData = JSON.parse(localStorage.getItem('logindata'));
      if (!loginData?.token || !loginData?._id) {
        console.error("Login data missing or invalid.");
        return;
      }

      const result = await apiConnector(
        "PUT",
        course.MARKASDONE_API,
        { subsectionid: subsectionId },
        { Authorization: `Bearer ${loginData.token}` }
      );

      console.log("Marked as done:", result);
      getCourse(); // refresh course data to update 'completed' flags
    } catch (error) {
      console.error("Error in markDoneVideo:", error);
    }
  };

  const getCourse = async () => {
    try {
      const loginData = JSON.parse(localStorage.getItem('logindata'));
      if (!loginData?.token || !loginData?._id) {
        console.error("Login data missing or invalid.");
        return;
      }

      const result = await apiConnector(
        "GET",
        `${course.COURSEBYCOURSID_API}?courseid=${courseId}`,
        null,
        { Authorization: `Bearer ${loginData.token}` }
      );

      setCourseData(result.data.data);
      console.log("Course detail fetched:", result);
    } catch (error) {
      console.error("Error fetching course:", error?.response?.data?.message || error.message);
    }
  };

  const deletereview = async () => {
    try {
      const loginData = JSON.parse(localStorage.getItem('logindata'));
      const userId = loginData._id;

      const result = await apiConnector(
        "DELETE",
        course.DELETERATING_API,
        {
          courseid: courseId,
          userid: userId
        },
        {
          Authorization: `Bearer ${loginData.token}`
        }
      );

      if (result?.data?.success) {
        console.log("Review deleted successfully:", result.data.message);

        // Optional: refresh course data or update UI
        // await fetchCourseDetails(); 
        // setalreadyreviewed(false);
        getCourse();
      } else {
        console.warn("Failed to delete review:", result?.data?.message || "Unknown error");
      }

    } catch (error) {
      console.error("Error deleting review:", error.message);
    }
  };

  useEffect(() => {
    getCourse();
  }, [courseId]);

  return (
    <div style={{ width: "100vw", minHeight: '100vh', display: 'flex', backgroundColor: '#000814', color: 'white' }}>
      {/* Sidebar */}
      <div style={{ width: "25%", padding: '20px', borderRight: '1px solid #1a1a1a', overflowY: 'auto' }}>

        {!alreadyreviewed ? <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#FFD60A',
            border: 'none',
            borderRadius: '8px',
            color: '#000814',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginBottom: '5%'
          }}
          onClick={() => {
            setreviewbox(true)
          }}
        >
          Add a Review
        </button> : <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#FFD60A',
            border: 'none',
            borderRadius: '8px',
            color: '#000814',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginBottom: '5%'
          }}
          onClick={() => {
            deletereview()
          }}
        >
          Delete Review
        </button>}

        <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', color: '#00C853' }}>{coursedata?.coursename}</h2>
        {coursedata?.coursecontent.map((section, sectionIndex) => (
          <div key={section._id || sectionIndex} style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#FFD60A', fontWeight: 600 }}>{section.sectionname}</h4>
            <ul style={{ listStyle: 'none', paddingLeft: '10px' }}>
              {section.subsection.map((sub, subIndex) => (
                <li
                  key={sub._id || subIndex}
                  onClick={() => {
                    setSubsectionVideo(sub.videourl);
                    setSubsectionId(sub._id);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '10px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    backgroundColor: subsectionId === sub._id ? '#003566' : 'transparent',
                    cursor: 'pointer',
                    color: '#ccc',
                    transition: 'background 0.3s ease'
                  }}
                >
                  <span style={{ fontSize: '14px' }}>• {sub.title}</span>
                  {sub.completed && <span style={{ color: '#00E676', fontSize: '16px' }}>✓</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Main Video Content */}
      {subsectionVideo ? (
        <div style={{ width: '75%', padding: '2%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ReactPlayer
            url={subsectionVideo}
            controls
            width="100%"
            height="80vh"
            style={{ borderRadius: '12px', overflow: 'hidden' }}
          />

          <button
            onClick={markDoneVideo}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#00C853',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              color: '#000',
              fontSize: '14px',
              transition: 'background 0.3s ease'
            }}
          >
            Mark as Completed
          </button>
        </div>
      ) : (
        <div style={{ width: '75%', padding: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ fontSize: '18px', color: '#bbb' }}>Select a video to start learning 🚀</p>
        </div>
      )}

      {
        showreviewbox && <Reviewbox setreviewbox={setreviewbox} />
      }

    </div>
  );
}

export default Viewcourse;
