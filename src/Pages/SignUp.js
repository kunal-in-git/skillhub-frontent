import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import signup from "../assets/Images/signup.webp";
import { setsignupdata } from "../slices/Signupslice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { user } from "../services/apis.js";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hiddenEnter, setEnter] = useState(true);
  const [hiddenConfirm, setConfirm] = useState(true);
  const [clicked, setValue] = useState(true);

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [email, setemail] = useState("");
  const [type, settype] = useState("student");

  const data = [
    {
      firstname: `${firstname}`,
      lastname: `${lastname}`,
      password: `${password}`,
      confirmpassword: `${confirmpassword}`,
      email: `${email}`,
      type: `${type}`,
    },
  ];


  function submitfunction() {

    if (!firstname || !lastname || !password || !confirmpassword || !email || !type) {
      toast.error("Please fill in all the required fields!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (password !== confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }
    
    if( password.length < 6 ){
      toast.error("Passwords length should be greater then 6!");
      return;
    }

    dispatch(setsignupdata(data));
    const otpsend = async () => {
      try {
        const result = await apiConnector("POST", user.OTPSEND_API, {
          email: email,
        });

        toast.success("otp send successfully");
        console.log("this is data of signupslice ", data);
        console.log("this is result by otpsend", result);

        navigate("/otp")
      } catch (error) {
        console.log("unable to get otp", error?.response?.data.message || error.message);

        if (error?.response?.data.message === "user already exists") {
          toast.error("User already exists. Please try logging in.");
          return;
        }

      }
    };
    otpsend();
  }

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#1c1e22",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box"
      }}
    >
      <ToastContainer />
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "1000px",
          height: "auto",
          minHeight: "500px",
          backgroundColor: "#24272b",
          borderRadius: "10px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
          flexDirection: window.innerWidth < 768 ? "column" : "row"
        }}
      >
        {/* Left Section */}
        <div
          style={{
            textAlign: "left",
            padding: window.innerWidth < 768 ? "2rem" : "3rem",
            width: window.innerWidth < 768 ? "100%" : "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <h2
            style={{
              fontSize: window.innerWidth < 768 ? "1.5rem" : "1.8rem",
              fontWeight: "700",
              color: "#f5c518"
            }}
          >
            Join the millions learning to code with Skill Hub
          </h2>
          <p style={{ fontSize: "1rem", color: "#c1c3c8" }}>
            Build skills for today, tomorrow, and beyond.
          </p>
          <p style={{ color: "cyan", fontStyle: "italic", fontSize: "1rem" }}>
            Education to future-proof your career.
          </p>

          {/* Student / Instructor Toggle */}
          <div style={{ display: "flex", marginTop: "1rem" }}>
            <button
              style={{
                padding: "10px 20px",
                marginRight: "10px",
                borderRadius: "20px",
                border: clicked ? "2px solid cyan" : "2px solid #888",
                backgroundColor: clicked ? "cyan" : "transparent",
                color: clicked ? "#000" : "#fff",
                cursor: "pointer",
                transition: "0.3s",
                fontSize: window.innerWidth < 480 ? "0.9rem" : "1rem"
              }}
              onClick={() => {
                setValue(true);
                settype("student");
              }}
            >
              Student
            </button>
            <button
              style={{
                padding: "10px 20px",
                borderRadius: "20px",
                border: !clicked ? "2px solid cyan" : "2px solid #888",
                backgroundColor: !clicked ? "cyan" : "transparent",
                color: !clicked ? "#000" : "#fff",
                cursor: "pointer",
                transition: "0.3s",
                fontSize: window.innerWidth < 480 ? "0.9rem" : "1rem"
              }}
              onClick={() => {
                setValue(false);
                settype("instructor");
              }}
            >
              Instructor
            </button>
          </div>

          {/* Name Fields */}
          <div style={{
            display: "flex",
            gap: "10px",
            marginTop: "1rem",
            flexDirection: window.innerWidth < 768 ? "column" : "row"
          }}>

            <div style={{ width: window.innerWidth < 768 ? "100%" : "50%" }}>
              <label>First Name *</label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#333",
                  borderRadius: "5px",
                  border: "1px solid #555",
                  color: "#fff",
                  marginBottom: window.innerWidth < 768 ? "1rem" : "0"
                }}
              />
            </div>

            <div style={{ width: window.innerWidth < 768 ? "100%" : "50%" }}>
              <label>Last Name *</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#333",
                  borderRadius: "5px",
                  border: "1px solid #555",
                  color: "#fff",
                }}
              />
            </div>

          </div>

          {/* email Field */}
          <label style={{ marginTop: "1rem", display: "block" }}>email *</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#333",
              borderRadius: "5px",
              border: "1px solid #555",
              color: "#fff",
            }}
          />

          {/* password Fields */}
          <div style={{
            display: "flex",
            gap: "10px",
            marginTop: "1rem",
            flexDirection: window.innerWidth < 768 ? "column" : "row"
          }}>
            <div style={{
              position: "relative",
              width: window.innerWidth < 768 ? "100%" : "50%",
              marginBottom: window.innerWidth < 768 ? "1rem" : "0"
            }}>
              <label>Enter password *</label>
              <input
                type={hiddenEnter ? "password" : "text"}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#333",
                  borderRadius: "5px",
                  border: "1px solid #555",
                  color: "#fff",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "53%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#fff",
                }}
                onClick={() => setEnter(!hiddenEnter)}
              >
                {hiddenEnter ? <IoIosEyeOff /> : <IoIosEye />}
              </div>
            </div>

            <div style={{
              position: "relative",
              width: window.innerWidth < 768 ? "100%" : "50%"
            }}>
              <label>Confirm password *</label>
              <input
                type={hiddenConfirm ? "password" : "text"}
                value={confirmpassword}
                onChange={(e) => setconfirmpassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#333",
                  borderRadius: "5px",
                  border: "1px solid #555",
                  color: "#fff",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "53%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#fff",
                }}
                onClick={() => setConfirm(!hiddenConfirm)}
              >
                {hiddenConfirm ? <IoIosEyeOff /> : <IoIosEye />}
              </div>
            </div>
          </div>

          {/* Create Account Button */}
          <div>
            <button
              onClick={submitfunction}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#f5c518",
                borderRadius: "5px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "1.5rem",
                border: "none"
              }}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            width: window.innerWidth < 768 ? "100%" : "40%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: window.innerWidth < 768 ? "1rem" : "2rem"
          }}
        >
          <img
            src={signup}
            alt="Signup Illustration"
            style={{
              width: "80%",
              maxWidth: "400px",
              height: "auto"
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;