import React, { useEffect, useState } from 'react'
import Navigationbar from '../component/Home/Navigationbar'
import { apiConnector } from '../services/apiconnector'
import { user } from '../services/apis'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaStar } from "react-icons/fa";
import MakePayment from './MakePayment';

function Cart() {

  const [coursesincart, setcoursesincart] = useState([]); // Initialize as an empty array
  const [totalamount, settotalcost] = useState();

  const getcartdata = async () => {
    try {
      const logindata = JSON.parse(localStorage.getItem("logindata"));

      if (!logindata) {
        console.error("No login data found in localStorage");
        return;
      }

      const token = logindata.token;
      const userid = logindata._id;

      if (!token || !userid) {
        console.error("Token or UserID missing");
        return;
      }

      const result = await apiConnector(
        "GET",
        `${user.GETCARTDATA_API}?userid=${userid}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );


      // calculate the total cost of cart

      if (result?.data?.data?.course?.length > 0) {
        let totalcost = 0
        for (let i = 0; i < result?.data?.data?.course?.length; i++) {
          totalcost += parseInt(result?.data?.data?.course[i].price.split("₹")[1]?.split(",").join("")) || 0
        }
        settotalcost(totalcost)
      }


      if (result?.data?.success) {
        console.log("Cart data retrieved:", result.data.data);
        setcoursesincart(result.data.data.course || []);
      } else {
        console.error("Failed to fetch cart data:", result?.data?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const removecourse = async (courseid) => {
    try {
      const logindata = JSON.parse(localStorage.getItem("logindata"));

      if (!logindata) {
        console.error("No login data found in localStorage");
        return;
      }

      const { token, _id: userid } = logindata;

      if (!token || !userid) {
        console.error("Token or UserID missing");
        return;
      }

      // Ensure courseid is valid
      if (!courseid) {
        console.error("Course ID is missing");
        return;
      }

      const response = await apiConnector(
        "DELETE",
        user.REMOVECOURSEFROMCAT_API,
        { userid, courseid },
        { Authorization: `Bearer ${token}` }
      );

      if (response?.data?.success) {
        console.log("Course removed successfully:", response.data);
        // Update state after successful removal
        setcoursesincart((prevCourses) =>
          prevCourses.filter((course) => course._id !== courseid)
        );
      } else {
        console.error("Failed to remove course:", response?.data?.message);
      }
    } catch (error) {
      console.error("Error removing course:", error);
    }
  };


  useEffect(() => {
    getcartdata()
  }, [coursesincart])

  return (

    <div >
      <Navigationbar />

      {coursesincart?.length === 0 ? (
        <div style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e2633, #161d29)',
          fontFamily: 'Segoe UI, sans-serif',
          color: 'rgba(255, 255, 255, 0.9)',
          padding: '2rem',
          gap: '1.5rem',
          textAlign: 'center',
        }}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
            alt="Empty cart"
            style={{
              width: '160px',
              opacity: 0.9,
              animation: 'float 2s ease-in-out infinite',
            }}
          />

          <div style={{ fontSize: '28px', fontWeight: '600' }}>
            Oops! Your cart is empty
          </div>

          <p style={{ fontSize: '16px', color: '#ccc', maxWidth: '400px' }}>
            Looks like you haven't added any courses yet. Start exploring our amazing collection and level up your skills today!
          </p>

          {/* Optional floating animation keyframe */}
          <style>{`
    @keyframes float {
      0% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0); }
    }
  `}</style>
        </div>

      ) : (
        <div style={{ background: 'rgb(44,51,63)', width: '100%', padding: '5%' }}>

          <div style={{ color: 'white', fontWeight: '500', fontSize: '30px' }}>
            My Wishlist
          </div>

          <div style={{ color: 'gray', borderBottom: '1px solid rgb(0,8,20)', marginTop: "3%" }}>
            {coursesincart.length}&nbsp;Courses in Wishlist
          </div>

          <div style={{ display: 'flex', width: "100%", minHeight: '100vh', justifyContent: 'center', alignItems: 'flex-start' }}>

            <div style={{ width: "80%", color: 'gray', marginTop: '1%' }}>
              <Table style={{ width: '80%', borderCollapse: 'collapse' }}>
                <Tbody>
                  {
                    coursesincart.map((data, index) => (
                      <Tr key={index} style={{ borderBottom: '1px solid rgb(0,8,20)' }}>
                        <Td style={{ display: 'flex', width: '100%', gap: '3%', padding: '3%' }}>
                          <div style={{ width: '30%' }}>
                            <img src={data.thumbnail} alt='thumbnail' style={{ width: '100%', height: '100%', borderRadius: '1em' }} />
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', width: '55%' }}>
                            <div style={{ color: 'white', fontWeight: '500', marginBottom: '2%' }}>
                              {data.coursename}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                              <span style={{ color: "grey", fontSize: "16px", fontWeight: "bold" }}>
                                {data.avgrating}
                              </span>
                              <FaStar style={{ color: "yellow", fontSize: "18px" }} />
                              &nbsp;(Rating count)
                            </div>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              padding: "10px",
                              borderRadius: "8px",
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                              background: 'rgb(0,8,20)'
                            }}
                          >
                            <button
                              style={{
                                backgroundColor: "#ff4d4d",
                                color: "#fff",
                                border: "none",
                                padding: "8px 12px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                transition: "background 0.3s",
                              }}
                              onMouseOver={(e) => (e.target.style.backgroundColor = "#cc0000")}
                              onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4d")}

                              onClick={() => { removecourse(data._id) }}
                            >
                              Remove
                            </button>

                            <div
                              style={{
                                marginTop: "10px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "#fff",
                              }}
                            >
                              {data.price}
                            </div>
                          </div>

                        </Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            </div>

            {coursesincart && <div
              style={{
                background: 'linear-gradient(135deg, #001324, #000814)',
                padding: '24px',
                borderRadius: '16px',
                color: '#ffffff',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
                maxWidth: '380px',
                margin: '10% auto',
                fontFamily: 'Segoe UI, Roboto, sans-serif',
                width: '20%',
                textAlign: 'center',
                transition: 'transform 0.3s ease',
              }}
            >
              <div
                style={{
                  marginBottom: '20px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingBottom: '12px',
                }}
              >
                <div style={{ fontSize: '1rem', opacity: 0.8 }}>Total</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '600', marginTop: '4px' }}>
                  ₹{totalamount}
                </div>
              </div>

              <MakePayment
                userid={JSON.parse(localStorage.getItem('logindata'))._id}
                fromcartflag={true}
                prize={totalamount}
                getcartdata={getcartdata}
              />
            </div>
            }

          </div>

        </div>
      )}


    </div >
  )
}

export default Cart
