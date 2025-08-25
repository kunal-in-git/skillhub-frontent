import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavLink, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./Navigationbar.css";
import { IoIosSearch } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { MdDashboard } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { apiConnector } from '../../services/apiconnector.js'
import { course } from "../../services/apis.js";

function Navigationbar() {
  const [ishover, sethover] = useState(false);
  const [isimageclicked, setimageclicked] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [image,setimage] = useState( localStorage.getItem("image") || "");

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("image");
    setimageclicked(!isimageclicked);
    navigate('/Home')
    window.location.reload();
  }

  const [category, setcategory] = useState([]);

  const fetchcategory = async () => {
    try {
      const logindata = JSON.parse(localStorage.getItem('logindata'));
      const token = logindata.token;

      const categorydata = await apiConnector(
        "GET",
        `${course.GETALLCATEGORY_API}`,
        null,
        {
          Authorization: `Bearer ${token}`
        }
      );

      localStorage.setItem("categoryId", categorydata);
      setcategory(categorydata.data.data);
      console.log("this is data from category", categorydata);
    } catch (error) {
      console.log("error in getting category data");
    }
  }

  useEffect(() => {
    fetchcategory();
  }, [])

  return (
    <>
      <div
        style={{
          width: "100%",
          position: "relative",
          height: "4em",
          backgroundColor: "rgba(0, 8, 20, 1)",
          borderBottom: "1px solid rgba(44, 51, 63, 1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NavLink to="/Home" style={{textDecoration:'none', color:'white', fontSize:'25px', fontWeight:'bolder'}}>
            SKILL HUB
          </NavLink>
        </div>
        <div
          style={{
            display: "flex",
            gap: "5%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NavLink
            style={{ textDecoration: "none", color: "rgba(219, 221, 234, 1)" }}
            to="/Home"
          >
            <div>Home</div>
          </NavLink>
          <div
            id="Navcatalog"
            onMouseEnter={() => sethover(true)}
            onMouseLeave={() => sethover(false)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white"
            }}
          >
            <div>Catalog</div>
            <MdKeyboardArrowRight
              style={{ fontSize: "1.5em", marginBottom: "-5%" }}
            />
          </div>
          <NavLink
            style={{ textDecoration: "none", color: "rgba(219, 221, 234, 1)" }}
            to="/Aboutus"
          >
            <div>About us</div>
          </NavLink>
          <NavLink
            style={{ textDecoration: "none", color: "rgba(219, 221, 234, 1)" }}
            to="/contact"
          >
            <div>Contact us</div>
          </NavLink>
        </div>

        {token === null ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "3%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NavLink to="/Login" style={{ textDecoration: "none" }}>
              <button style={{ padding: "10%" }}>
                Login
              </button>
            </NavLink>
            <NavLink style={{ textDecoration: "none" }} to="/SignUp">
              <button style={{ padding: "10%", width: '150%' }}>
                Sign In
              </button>
            </NavLink>
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "3%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <IoIosSearch
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "120%",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.target.style.color = "white")}
                onMouseLeave={(e) => (e.target.style.color = "lightgrey")}
              />
            </div>
            <div>
              <CiShoppingCart
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: "120%",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "lightgrey";
                }}
                onClick={() => { navigate("/cart") }}
              />
            </div>
            <div
              style={{
                width: "5%",
                position: "relative",
                cursor: "pointer",
              }}
              onClick={() => {
                setimageclicked(!isimageclicked);
              }}
            >
              <img
                src={image}
                alt="user_icon"
                style={{
                  width: "25px",
                  height: "25px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "2px solid #ffcc00", // optional highlight border
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s ease-in-out",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />

            </div>
          </div>
        )}
      </div>
      {isimageclicked && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            background: "rgba(0, 8, 20, 1)",
            position: "absolute",
            right: "4%",
            width: "10%",
            cursor: "pointer",
            border: "1px solid rgb(33, 37, 43)",
            top: "8%"
          }}
        >
          <NavLink to='/user/Dashboard' style={{ textDecoration: 'none' }}>
            <div
              style={{
                display: "flex",
                gap: "5%",
                color: "white",
                width: "100%",
                padding: "7%",
                borderBottom: "1px solid rgb(33, 37, 43)",
              }}
            >
              <div>
                <MdDashboard />
              </div>
              <div >Dashboard</div>
            </div>
          </NavLink>
          <div
            style={{
              display: "flex",
              gap: "5%",
              color: "white",
              width: "100%",
              padding: "7%",
            }}
            onClick={logout}
          >
            <div>
              <IoLogOutOutline />
            </div>
            <div>Logout</div>
          </div>
        </div>
      )}

      {ishover && (
        <div
          onMouseEnter={() => sethover(true)}
          onMouseLeave={() => sethover(false)}
        >
          <div
            style={{
              width: "20%",
              position: "absolute",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
              zIndex: 10,
              left: "40%",
              top: '8%'
            }}
          >
            {category?.map((data, index) => (
              <NavLink to={`/catalog/${data.name}`} style={{ textDecoration: 'none', width: '100%' }} key={index}>
                <div
                  // key={index}
                  style={{
                    width: "100%",           // Full width of parent
                    padding: "8px 12px",      // Inner spacing
                    marginBottom: "6px",      // Space between items
                    borderRadius: "6px",      // Rounded corners
                    backgroundColor: "#f3f4f6", // Light gray background
                    color: "#333",            // Dark text color
                    fontSize: "16px",         // Readable text
                    fontWeight: "500",        // Medium font weight
                    cursor: "pointer",        // Clickable effect
                    transition: "background-color 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
                >
                  {data.name}
                </div>
              </NavLink>
            ))}
          </div>

          <div
            style={{
              width: "3%",
              height: "3%",
              position: "absolute",
              backgroundColor: "white",
              zIndex: 0,
              left: "47.4%",
              transform: "rotateZ(45deg)",
              top: '8%'
            }}
          ></div>
        </div>
      )}
    </>
  );
}

export default Navigationbar;
