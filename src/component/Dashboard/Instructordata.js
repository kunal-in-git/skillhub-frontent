import React, { useEffect, useState } from 'react';
import { apiConnector } from '../../services/apiconnector';
import { course } from '../../services/apis';
import ReactApexChart from 'react-apexcharts';

function Instructordata() {
  const [allcourses, setallcourses] = useState([]);
  const [allcolor, setallcolor] = useState([]);
  const [studentdata, setstudentdata] = useState(true);
  const [totalstudents, settotalstudents] = useState(0);
  const [totalearning, settotalearning] = useState(0);

  const [logindata, setlogindata] = useState(() => {
    try {
      const storedData = localStorage.getItem('logindata');
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error("Error parsing logindata from localStorage:", error);
      return null;
    }
  });

  const getallenrolledcourse = async () => {
    try {
      const logindata = JSON.parse(localStorage.getItem('logindata'));
      const token = logindata.token;

      const result = await apiConnector(
        "GET",
        `${course.GETALLCOURSEBYUSERID_API}?userId=${logindata._id}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      setallcourses(result?.data?.data.courses || []);
    } catch (error) {
      console.error("Error while fetching enrolled courses:", error.message);
    }
  };

  const randomcolorgenerator = (number) => {
    const tempcolor = [];
    let tempstudents = 0;
    let tempincome = 0;

    for (let i = 0; i < number; i++) {
      const color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
      tempcolor.push(color);

      const students = allcourses[i]?.studentsenrolled?.length || 0;
      tempstudents += students;

      const price = parseInt(allcourses[i]?.price?.split("₹")[1]?.replace(/,/g, "") || 0);
      tempincome += students * price;
    }

    setallcolor(tempcolor);
    settotalstudents(tempstudents);
    settotalearning(tempincome);
  };

  useEffect(() => {
    if (allcourses?.length > 0) {
      randomcolorgenerator(allcourses.length);
    }
  }, [allcourses, studentdata]);

  useEffect(() => {
    getallenrolledcourse();
  }, []);

  const chartOptions = {
    chart: {
      width: 380,
      type: 'donut',
      animations: {
        enabled: true,
        easing: 'easeInOutQuad',
        speed: 1000,
        animateGradually: {
          enabled: true,
          delay: 200,
        },
      },
    },
    colors: allcolor,
    labels: allcourses?.map(course => course.coursename),
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: 'top',
      offsetY: 0,
      labels: {
        colors: "#fff"
      }
    },
  };

  const chartSeries = studentdata
    ? allcourses.map(course => course?.studentsenrolled?.length || 0)
    : allcourses.map(course => {
      const price = parseInt(course?.price?.split("₹")[1]?.replace(/,/g, "") || 0);
      return (course?.studentsenrolled?.length || 0) * price;
    });

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: 'rgb(22,29,41)',
      padding: '2rem',
      fontFamily: 'Segoe UI, sans-serif',
      color: '#fff'
    }}>
      <div style={{
        fontSize: '1.8rem',
        fontWeight: 700,
        marginBottom: '0.5rem',
        color: '#fff',
        textShadow: '0 0 10px rgba(255,255,255,0.2)'
      }}>
        Hi {logindata?.firstname} {logindata?.lastname}
      </div>

      <div style={{
        fontSize: '1rem',
        color: 'lightgray',
        marginBottom: '2rem',
        fontStyle: 'italic',
        textShadow: '0 0 5px rgba(255,255,255,0.1)'
      }}>
        Let’s start something new
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'space-between'
      }}>
        {/* Chart Section */}
        <div style={{
          flex: '1 1 60%',
          backgroundColor: 'rgb(0,8,20)',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }}>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '1rem',
            color: '#ffffff',
            textShadow: '0 0 8px rgba(0, 255, 255, 0.2)'
          }}>
            Visualize
          </div>

          <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setstudentdata(true)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: studentdata ? '#4f46e5' : '#1f2937',
                color: '#fff',
                border: '1px solid #4f46e5',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: studentdata ? '0 0 10px #4f46e5' : 'none'
              }}
            >
              Students
            </button>

            <button
              onClick={() => setstudentdata(false)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: !studentdata ? '#4f46e5' : '#1f2937',
                color: '#fff',
                border: '1px solid #4f46e5',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: !studentdata ? '0 0 10px #4f46e5' : 'none'
              }}
            >
              Income
            </button>
          </div>

          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="donut"
            width={500}
          />
        </div>

        {/* Stats Section */}
        <div style={{
          flex: '1 1 35%',
          backgroundColor: 'rgb(0,8,20)',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <div style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#ffffff',
            textShadow: '0 0 6px rgba(255, 255, 255, 0.2)'
          }}>
            Statistics
          </div>

          <div>
            <div style={{ fontWeight: 500, color: '#ccc' }}>Total Courses</div>
            <div style={{ fontSize: '1.2rem', color: '#fff' }}>{allcourses.length}</div>
          </div>

          <div>
            <div style={{ fontWeight: 500, color: '#ccc' }}>Total Students</div>
            <div style={{ fontSize: '1.2rem', color: '#fff' }}>{totalstudents}</div>
          </div>

          <div>
            <div style={{ fontWeight: 500, color: '#ccc' }}>Total Income</div>
            <div style={{ fontSize: '1.2rem', color: '#00ffcc' }}>₹{totalearning.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instructordata;
